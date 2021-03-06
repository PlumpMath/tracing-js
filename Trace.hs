module Trace where

import Control.Applicative
import Control.Monad (liftM)
import Data.Maybe (fromMaybe)

import Language.ECMAScript3
import Language.ECMAScript3.PrettyPrint (Pretty, prettyPrint)
import Language.ECMAScript3.Syntax.Annotations (getAnnotation, reannotate)
import Text.Parsec.Pos (sourceLine, sourceColumn)
import Text.PrettyPrint.Leijen (Doc, displayS, renderPretty)

simplePos = (,) <$> sourceLine <*> sourceColumn

varRef p = VarRef p . Id p

prop p = PropId p . Id p
int p = IntLit p
toPos p = ObjectLit p [(prop p "line", int p $ sourceLine p), (prop p "col", int p $ sourceColumn p)]

traceLine p = CallExpr p (varRef p "traceLine") [IntLit p $ sourceLine p]
traceRead p name expr = CallExpr p (varRef p "traceRead") [StringLit p name, expr, toPos p]
traceWrite p name expr isInit = CallExpr p (varRef p "traceWrite") [StringLit p name, expr, BoolLit p isInit, toPos p]
traceValue p exprStr expr = CallExpr p (varRef p "traceValue") [StringLit p exprStr, expr, toPos p]

traceStmt :: Statement SourcePos -> Statement SourcePos
traceStmt (BlockStmt p ss) = BlockStmt p $ map traceStmt ss
traceStmt (ExprStmt p e) = ExprStmt p $ traceExpr e
traceStmt (IfStmt p test body alts) = IfStmt p (traceExpr test) (traceStmt body) (traceStmt alts)
traceStmt (IfSingleStmt p test body) = IfSingleStmt p (traceExpr test) (traceStmt body)
traceStmt (WhileStmt p test body) =
    WhileStmt p (ListExpr p [traceLine p, traceExpr test]) (traceStmt body)
traceStmt (ForStmt p init test inc body) =
    ForStmt p (traceForInit init)
              (Just $ ListExpr p $ traceLine p : fromMaybe [] (liftM ((:[]) . traceExpr) test))
              (Just $ ListExpr p $ traceLine p : fromMaybe [] (liftM ((:[]) . traceExpr) inc))
              (traceStmt body)
traceStmt (VarDeclStmt p ds) = VarDeclStmt p $ map traceVarDecl ds
traceStmt (FunctionStmt p name args body) = FunctionStmt p name args $ map traceStmt body
traceStmt s = s

traceExpr :: Expression SourcePos -> Expression SourcePos
traceExpr (ArrayLit p es) = ArrayLit p $ map traceExpr es
traceExpr (ObjectLit p ds) = ObjectLit p $ map tracePropDefs ds
    where tracePropDefs (p, expr) = (p, traceExpr expr)
traceExpr e@(VarRef p (Id _ name)) = traceRead p name e
traceExpr e@(DotRef p _ _) = traceRead p (pp e) e
traceExpr e@(BracketRef p _ _) = traceRead p (pp e) e
traceExpr e@(UnaryAssignExpr p _ _) = traceWrite p (pp e) e False
traceExpr e@(InfixExpr p op l r) = traceValue p (pp e) $ InfixExpr p op (traceExpr l) (traceExpr r)
traceExpr (AssignExpr p op l r) = AssignExpr p op (traceLValue l) $ traceWrite p (pp l) (traceExpr r) False
traceExpr e@(CallExpr p name args) | not (ignoreCall name) = traceValue p (pp e) $ CallExpr p name $ map traceExpr args
traceExpr (FuncExpr p name args body) = FuncExpr p name args $ map traceStmt body
traceExpr e = e

ignoreCall (VarRef _ (Id _ name)) = name == "traceLine"
ignoreCall _ = False

traceCases (CaseClause p label body) = CaseClause p (traceExpr label) $ map traceStmt body
traceCases (CaseDefault p body) = CaseDefault p $ map traceStmt body

traceForInit (VarInit ds) = VarInit $ map traceVarDecl ds
traceForInit (ExprInit e) = ExprInit $ traceExpr e
traceForInit i = i

traceLValue (LBracket p l r) = LBracket p (traceExpr l) (traceExpr r)
traceLValue lval = lval

traceVarDecl (VarDecl p id@(Id _ name) (Just expr)) =
    VarDecl p id . Just $ traceWrite p name expr True
traceVarDecl v = v

pp :: (Pretty a) => a -> String
pp = (`displayS` "") . renderPretty 1.0 100 . prettyPrint

type JSCode = String

traceJSLines :: JSCode -> JSCode
traceJSLines = unlines . map traceJSLine . zip [1..] . lines
    where traceJSLine (n, line) = "traceLine(" ++ (show n) ++ "); " ++ line

traceJS :: JSCode -> JSCode
traceJS c = either (const c) (pp . map traceStmt . unJavaScript) . parseFromString $ traceJSLines c
