from random import randint
# 先通过列表推导式生成原始数据
raw = {x:randint(60,100) for x in 'abcdefgh'}
# 方法一：转换成元组进行排序,注意要交换k和v的顺序，因为元组先比较第一个值
mid = [(v,k) for k,v in raw.items()]
# 因为元组本身可以比较大小，所以直接比较即可
mid = sorted(mid,reverse=True)
print(mid)

# 方法二，虽然字典不能排序，但可以通过key指定比较的值
mid2 = sorted(raw.items(),key=lambda x : x[1],reverse=True)
# 用enumerate方法生成序列，第二个参数表示从1开始，其返回一个生成器，需要用list序列化
# last = list(enumerate(mid2,1))

last = {tup[0]:(no,tup[1]) for no,tup in enumerate(mid2,1)}
print(last)