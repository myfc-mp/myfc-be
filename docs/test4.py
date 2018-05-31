import re
from collections import Counter

# 读取一个txt文件
txt= open('11.txt').read()
# 用正则表达式把单词提取出来,下面的含义是用非字符作为分隔符，提取所有单词到列表中
txtlist = re.split('\W+',txt)
# 通过Counter函数进行频度统计
c = Counter(txtlist)
print(c.most_common(10))