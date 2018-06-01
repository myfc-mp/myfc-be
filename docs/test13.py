from collections import Iterable,Iterator
from urllib import request
# 自己实现一个迭代对象，必须实现Iterable,Iterator两个类

# WeatherIterator继承Iterator，用于依次取下一个城市的天气
class WeatherIterator(Iterator):
    # 当一个可迭代对象要开始迭代的时候，先会生成一个Iterator对象，通过传入可迭代对象本身来创建
    def __init__(self,cities):
        self.cities = cities
        self.index = 0
    # 迭代的过程中，通过调用__next__方法找到下一个城市
    def __next__(self):
        # 先判断是否已经到了末尾，如果到了就返回StopIteration异常
        if self.index == len(self.cities):
            raise StopIteration
        # 否则就返回下一个可迭代对象的值
        city = self.cities[self.index]

        self.index += 1
    # get_weather可以作为一个通用函数，传入迭代器对象，这里为了学习，把获取具体天气情况的函数放到迭代器内部
    def get_weather(self,city):
        url = 'http://wthrcdn.etouch.cn/weather_mini?city='+city
        r = request.urlopen(url)
        data = r.json()['data']['forecast'][0]
        return city,data['high'],data['low']