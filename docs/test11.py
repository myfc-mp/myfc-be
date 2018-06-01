import re

s = '2018-03-18 I have a picter to send to you at 2016-09-11'

# 目的：对字符串中的日期格式进行替换，改为月/日/年

# 使用re.sub这个函数进行替换
# 1.通过分组，用组来改变次序，组用\1表示第一个组，以此类推
# 2.正则表达式要用r放在字符串前面，表示原始字符，这样才能避免被转义
result = re.sub(r'(\d{4})-(\d{2})-(\d{2})',r'\2/\3/\1',s)

print(result)
