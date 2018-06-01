# 如何将字符串合并
from functools import reduce
s = ['fd','wf','grg','hth','yheth']

# 方法一，用reduce，每次需要创建中间内存，且耗时也比较长

result = reduce(str.__add__,s)

print(result)

# 方法二，用str.join()函数，str是合并后的间隔符，如果不需要间隔符，就直接用空字符串,这种方式快很多

result1 = '.'.join(s)
print(result1)