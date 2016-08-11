# node-luck
一个基于nodejs的简单抽奖算法

算法描述
 * 1、礼品的数量作为其中奖概率（数量少--则认为价值大，中奖概率小；反之则大）
 * 2、设置一个总概率（不需对每个礼品都设置中奖概率）
 * 3、产生随机数，落在哪个区间，就中什么奖
 * 4、所落的区间，礼品没库存了，也当做没中奖
 * 如luck.js中例子： 
     * 随机数发生区间为[0, 250)   (250 = 200/0.8  随机数范围 = 礼品总数 / 总中奖率)
     * 礼品A中奖区间[0, 10), 礼品B中奖区间[10, 60), 礼品C中奖区间[60, 200), 不中奖区间[200, 250)
     
