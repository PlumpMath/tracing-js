{-# LANGUAGE OverloadedStrings #-}

import Snap.Core
import Snap.Http.Server

import Data.Monoid (mempty)
import qualified Data.ByteString.Char8 as B8
import Data.String.Conversions (convertString)
import Control.Monad (liftM)
import Text.Read (readMaybe)

import System.Environment (getArgs)

import Trace

jsResponse :: String -> Snap ()
jsResponse str = do
    modifyResponse $ addHeader "Content-Type" "text/plain; charset=UTF-8"
    modifyResponse $ addHeader "Access-Control-Allow-Origin" "*"
    writeLBS $ convertString str

app = do
    code <- (return . maybe "" id . fmap convertString) =<< getQueryParam "code"
    let tracedCode = traceJS code
    jsResponse tracedCode

runServer :: Int -> IO ()
runServer port = httpServe config app
    where config = setPort port
                 . setAccessLog ConfigNoLog
                 . setErrorLog (ConfigIoLog B8.putStrLn)
                 $ mempty

main :: IO ()
main = getArgs >>= runServer . read . head
