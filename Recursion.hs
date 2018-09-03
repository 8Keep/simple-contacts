
isqrt = floor . sqrt . fromIntegral
ip _ [] = True
ip n (x:xs)
   | n `mod` x == 0 = False
   | otherwise = ip n xs

isPrime n 
    | n <= 1 = False
    | otherwise = ip n [2..(isqrt n)]
   
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci n = fibonacci(n-1) + fibonacci(n-2)  

factorial 0 = 1
factorial n = n * factorial(n-1)