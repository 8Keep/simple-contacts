isqrt = floor . sqrt .fromIntegral
ip _ [] = True
ip n (x:xs)
    | n `mod` x == 0 = False
    | otherwise = ip n xs
    
isPrime n
    | n <= 1 = False
    | otherwise = ip n [2..(isqrt n)]

factorial 0 = 1
factorial 1 = 1
factorial n = n * factorial (n-1)

fibonacci 0 = 0
fibonacci 1 = 1
fibonacci n = fib (n-1) + fib (n-2)

