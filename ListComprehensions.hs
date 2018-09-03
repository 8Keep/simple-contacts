multipleOf5 x = [ x | x <- [1..x], (x `mod` 5 == 0)]

multipleOf7Or11 x = [ x | x <- [1..x], ((x `mod` 7 == 0) || (x `mod` 11 == 0))]

multipleOf3And7 x = [ x | x <- [1..x], ((x `mod` 3 == 0) && (x `mod` 7 == 0))]
