<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="updateChecked(cartInfo.skuId, cartInfo.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changSkuNum('sub', cartInfo, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changSkuNum('change', cartInfo, $event.target.value * 1)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changSkuNum('add', cartInfo, +1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:void(0)"
              class="sindelet"
              @click="deleteCartById(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="javascript:void(0)">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" :disabled="cartInfoList.length<=0" @change="updateAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteSelectedCart"
          >删除选中的商品</a
        >
        <a href="javascript:void(0)">移到我的关注</a>
        <a href="javascript:void(0)">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:void(0)"  @click="settle">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  methods: {
    getData() {
      this.$store.dispatch("cartList");
    },
    changSkuNum: throttle(async function (type, cartInfo, skuNum) {
      switch (type) {
        case "add":
          skuNum = cartInfo.skuNum > 199 ? 0 : 1;
          break;
        case "sub":
          skuNum = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(skuNum) || skuNum < 1 || skuNum > 200) {
            skuNum = 0;
          } else {
            skuNum = parseInt(skuNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addToCart", {
          skuId: cartInfo.skuId,
          skuNum: skuNum,
        });
        this.getData();
      } catch (error) {
        return Promise.reject(new Error(error.message));
      }
    }, 1000),
    async updateChecked(skuID, isChecked) {
      try {
        isChecked = isChecked == 1 ? 0 : 1;
        await this.$store.dispatch("updateChecked", { skuID, isChecked });
        this.getData();
      } catch (error) {
        return Promise.reject(new Error(error.message));
      }
    },
    async deleteCartById(skuId) {
      try {
        await this.$store.dispatch("deleteCartByID", skuId);
        this.getData();
      } catch (error) {
        return Promise.reject(new Error(error.message));
      }
    },
    async deleteSelectedCart() {
      try {
        await this.$store.dispatch("deleteSelectedCart");
        this.getData();
      } catch (error) {
        return Promise.reject(new Error(error.message))
      }
    },
    async updateAllChecked(event){
      try {
        await this.$store.dispatch('updateAllChecked',event.target.checked)
        this.getData()
      } catch (error) {
        return Promise.reject(new Error(error.message))
      }
    },
    settle(){
      this.$router.push('/trade')
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
