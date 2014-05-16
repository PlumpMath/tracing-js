import Trace (traceJS)
import System.Environment (getArgs)

main :: IO ()
main = getArgs >>= readFile . head >>= putStrLn . traceJS
