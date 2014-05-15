import Control.Applicative

import Language.ECMAScript3
import Language.ECMAScript3.PrettyPrint (Pretty, prettyPrint)
import Language.ECMAScript3.Syntax.Annotations (getAnnotation, reannotate)
import Text.Parsec.Pos (sourceLine, sourceColumn)
import Text.PrettyPrint.Leijen (Doc, displayS, renderPretty)

import System.Environment (getArgs)

simplePos = (,) <$> sourceLine <*> sourceColumn

traceExpr :: SourcePos -> Expression SourcePos
traceExpr p = CallExpr p (VarRef p (Id p "traceLine")) [IntLit p $ sourceLine p]

traceStmt :: SourcePos -> Statement SourcePos
traceStmt p = ExprStmt p $ traceExpr p

insertTraceLine :: Statement SourcePos -> Statement SourcePos
insertTraceLine (ForStmt p init test expr body) = ForStmt p init (exprWithTrace test) (exprWithTrace expr) body
    where exprWithTrace = Just . maybe (ListExpr p [traceExpr p]) (ListExpr p . insert [traceExpr p])
insertTraceLine s = s

insert :: [a] -> a -> [a]
insert xs x = xs ++ [x]

traceLine :: Statement SourcePos -> Statement SourcePos
traceLine stmt =
    if col == 1
    then insertTraceLine stmt
    else stmt
  where col = sourceColumn . getAnnotation $ stmt

type JSCode = String

traceLinesSimple :: JSCode -> JSCode
traceLinesSimple = unlines . map addTrace . zip [1..] . lines
    where addTrace (n, line) = "traceLine(" ++ (show n) ++ "); " ++ line

traceLines :: JSCode -> JSCode
traceLines c = either (const c) id $ addTrace c
    where addTrace = fmap (prettyPrint' . map insertTraceLine . unJavaScript) . parseFromString . traceLinesSimple

prettyPrint' :: Pretty a => a -> String
prettyPrint' = (`displayS` "") . renderPretty 1.0 100 . prettyPrint

main :: IO ()
main = getArgs >>= readFile . head >>= putStrLn . traceLines
