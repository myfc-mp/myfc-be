# 目的，对有多个分隔符的字符串进行切割

s='ds,fef,poi;wefef:frt,3er:6ty'

# 方法一：使用正则表达式的split方法
# import re

# result = re.split('[,;:]',s)
# print(result)

# 方法二：使用字符串的split方法

# 字符串的split方法只能一个一个分割符地处理

# split返回一个被切割列表
#result = s.split(',')
#由于需要对结果再次进行切割，很容易想到用reduce方法
from functools import reduce

# resuce有两种场景，一种是直接把一个可迭代对象，依次序传入，迭代处理即可，这种方法提前需要知道处理方法，在处理过程中，不需要另外的输入
# 第二种场景，迭代处理每次需要用一个新的输入，我们这个例子就属于第二种场景，每次迭代要用新的分隔符
# 在第二种场景中，要用三个参数，第三个参数就是初始处理的字符串，第二个参数是每次处理的输入，它是一个可迭代对象，每次取其中一个输入

# reduce(处理函数,',;:',[s])

# reduce的第一个参数是处理函数，它接收两个参数，第一个参数是上次调用的结果，第二个参数是本次带入的参数
# 一般可以用lambda表达式，该问题中，lambda表达式的两个参数，第一个是上次调用的结果，第二个是本次切割所用的符号

# lambda ss,sep:处理过程

# lambda的处理过程需要返回被某个切割符切割后的结果，结果的格式需要list
# 切割可以直接用split方法
# 由于每次传入的ss是一个字符串list，所以需要用map，对list里面的每个字符串都进行分割

# map(lambda l:l.split(sep),ss)

# 由于map的结果需要作为下一次reduce的入参
# reduce的第二个参数只需要考虑
result = reduce(lambda ss,sep:sum(map(lambda l:l.split(sep),ss),[]),',;:',[s])
print(list(result))