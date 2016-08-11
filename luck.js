/**
 * 抽奖接口
 * 1、礼品的数量作为其中奖概率（数量少--则认为价值大，中奖概率小；反之则大）
 * 2、设置一个总概率（不需对每个礼品都设置中奖概率）
 * 3、产生随机数，落在哪个区间，就中什么奖
 * 如下面例子： 
     随机数发生区间为[0, 250)   (250 = 200/0.8  随机数范围 = 礼品总数 / 总中奖率)
     礼品A中奖区间[0, 10), 礼品B中奖区间[10, 60), 礼品C中奖区间[60, 200), 不中奖区间[200, 250)
     所落的区间，礼品没库存了，也当做没中奖
 */
async luck1Action() {
    // 模拟礼品
    let goods = [{'name':'A','stock': 10, 'total': 10},
                 {'name':'B','stock': 50, 'total': 50},
                 {'name':'C','stock': 140, 'total': 140}];
    // 每个礼品的中奖情况
    let lucks = [{'name':'A', 'luck': 0},
                 {'name':'B', 'luck': 0},
                 {'name':'C', 'luck': 0},
                 {'name':'没中', 'luck': 0}]
    let threshold = 0.8; // 总中奖概率
    let tal = 200;  // 礼品总数
    let num = tal/threshold; // 随机数范围 = 礼品总数 / 总中奖率
    // 模拟num次抽奖
    for(let i=0; i<num; i++){
        // 随机数发生
        let random = Math.round(Math.random() * (num-1));
        // 随机数发生在没中奖的范围
        if (random >= tal){
            console.log('第'+i+'次没中奖, 随机数是'+random);
            lucks[3].luck += 1; // 不中奖
            continue;
        }
        let cur = 0;
        for (let j=0; j<goods.length; j++){
            let next = cur + goods[j].total;
            // 随机数落在奖品的区间
            if(cur <= random && random < next){
                // 所落的区间，礼品没库存了
                if(goods[j].stock <= 0){
                    console.log('【没库存】第'+i+'次中奖: '+goods[j].name+', 随机数是'+random);
                    lucks[3].luck += 1; // 库存没了,不中奖
                    break;
                }
                // 中奖
                console.log('第'+i+'次中奖: '+goods[j].name+', 随机数是'+random);
                goods[j].stock -= 1; // 中奖减库存
                lucks[j].luck += 1;
                break;
            }
            cur = next;
        }
    }
    return this.success(lucks);
}
