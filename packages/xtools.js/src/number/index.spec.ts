import { expect } from 'chai';
import { accAdd, accSub, accMulti, accDiv } from '.';

// 2.3/0.1 = 22.999999999999996
// 2.3*0.1 = 0.22999999999999998

describe('accAdd 加法测试用例', () => {

  it('23.458 + 22.222 = 45.68', () => {
    expect(accAdd(23.458, 22.222)).equals(45.68)
  })

  it('23 + 22.242 = 45.242', () => {
    expect(accAdd(23, 22.242)).equals(45.242)
  })

  it('23 + 22.2 = 45.2', () => {
    expect(accAdd(23, 22.2)).equals(45.2)
  })

  it('23 + 22.2 + 13.316 + 899.452 + 33 + 63.0 = 1053.968', () => {
    expect(accAdd(23, 22.2, 13.316, 899.452, 33, 63.0)).equals(1053.968)
  })

  it('58.51678512 + 899.45208732301 = 957.96887244301', () => {
    expect(accAdd(58.51678512, 899.45208732301)).equals(957.96887244301)
  })

  it('23 + 22.2 + 13.31678512 + 899.45208732301 + 33 + 63.0 = 1053.96887244301', () => {
    expect(accAdd(23, 22.2, 13.31678512, 899.45208732301, 33, 63.0)).equals(1053.96887244301)
  })

  it('23 + 22.2 + (-13.31678512) + 899.45208732301 + 33 + 63.0 = 1027.33530220301', () => {
    expect(accAdd(23, 22.2, -13.31678512, 899.45208732301, 33, 63.0)).equals(1027.33530220301)
  })

})

describe('accSub 减法测试用例', () => {

  it('34.12823 - 897 = -862.87177', () => {
    expect(accSub(34.12823, 897)).equals(-862.87177)
  })

  it('899.45208732301 - 58.51678512 = 840.93530220301', () => {
    expect(accSub(899.45208732301, 58.51678512)).equals(840.93530220301)
  })

  it('87651.2351098 - 13.48 - 11.76509 - 1 - 987 = 86637.99001980001', () => {
    expect(accSub(87651.2351098, 13.48, 11.76509, 1, 987)).equals(86637.99001980001)
  })

  it('87651.2351098 - 13.48 - (-11.76509) - 1 - 987 = 86661.52019980001', () => {
    expect(accSub(87651.2351098, 13.48, -11.76509, 1, 987)).equals(86661.52019980001)
  })

})

describe('accMulti 乘法测试用例', () => {

  it('2.3 * 0.1 = 0.23', () => {
    expect(accMulti(2.3, 0.1)).equals(0.23)
  })

  it('764.234 * 2.231 = 1705.006054', () => {
    expect(accMulti(764.234, 2.231)).equals(1705.006054)
  })

  it('764.234 * 2.231 * 1.8 * 1 = 3069.0108972', () => {
    expect(accMulti(764.234, 2.231, 1.8, 1)).equals(3069.0108972)
  })

  it('764.234 * 2.231 * 1.8 * 1 * -5.34612 = -16407.300537738865', () => {
    expect(accMulti(764.234, 2.231, 1.8, 1, -5.34612)).equals(-16407.300537738865)
  })

})


describe('accDiv 除法测试用例', () => {

  it('1个参数时结果为该参数', () => {
    expect(accDiv(2.3)).equals(2.3)
  })

  it('876872 / 1.23 / 187 = 3812.321203425938', () => {
    expect(accDiv(876872, 1.23, 187)).equals(3812.321203425938)
  })

  it('57.45 / 3 / 2 = 9.575', () => {
    expect(accDiv(57.45, 3, 2)).equals(9.575)
  })

})
