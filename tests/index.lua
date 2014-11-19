print("Should return: variables 1, 2, and 3")
dofile("luaScript/makeVariables.lua")

print("\nReturning a variable from javascript: " .. js.global.myString)
print("\nCalling a javascript function and passing in the word 'cat': ")
js.global:myFunction('cat')

print("\nAdding a variable to global scope so javascript can access it.")
js.global.newLuaVar = "hello from lua"