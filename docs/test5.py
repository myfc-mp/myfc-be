from random import randint,sample
from functools import reduce
dl = []
for i in range(5):
    # 通过sample采样出4到6个球员，每个球员这一轮可能进1到3个球
    dl.append({x:randint(1,3) for x in sample('abcdefgh',randint(4,6))})
# map是重复调用，从第二轮到最后一轮的进球数据都传给map，每一轮的数据都通过lambda表达式,判断这个球员是否在这一轮有进球
# 然后通过all来判断map生成的所有结果是否都为True
# 如果all返回True，说明这个球员不但在第一轮有进球，而且在后面每一轮都有进球
namelist = [goalNameIn1stRound for goalNameIn1stRound in dl[0] if all(map(lambda goalData: goalNameIn1stRound in goalData, dl[1:]))]
print(namelist)

# 方法二：dick.keys返回一个字典的所有键，于是map得到一个每轮进球球员列表的列表，是一个二维列表
# 把每轮进球球员的名字列表传入reduce，reduce的处理过程通过一个lambda表达式来定义
# 这个lambda表达式通过取交集的操作，判断两轮进球球员列表是否有重复，如果有，就是候选名字，直到把5轮都取完
# 最后还有的名字，就是5轮都有进球的球员
last = reduce(lambda a,b:a&b,map(dict.keys,dl))
print(last)