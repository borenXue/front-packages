import { expect } from 'chai';
import { filterArray, filterArrayMulti, filterTime, filterMoney, filterBoolean } from './index';

describe('filterArray 测试用例', () => {

  it('基本用法', () => {
    expect(filterArray(123, [
      { id: 123, name: 'abc' },
      { id: 456, name: 'def' },
    ])).equal('abc')
  });


  it('自定义 id 和 name', () => {
    expect(filterArray(123, [
      { key: 123, val: 'abc' },
      { key: 456, val: 'def' },
    ], 'key', 'val')).equal('abc')
  });

  it('默认 emptyDesc', () => {
    expect(filterArray(1234, [
      { key: 123, val: 'abc' },
      { key: 456, val: 'def' },
    ], 'key', 'val')).equal(1234)
  });

  it('自定义 emptyDesc', () => {
    expect(filterArray(1234, [
      { key: 123, val: 'abc' },
      { key: 456, val: 'def' },
    ], 'key', 'val', '--')).equal('--')
  });

});


describe('filterArrayMulti 测试用例', () => {

  it('基本用法', () => {
    expect(filterArrayMulti([123, 789], [
      { id: 123, name: 'abc' },
      { id: 456, name: 'def' },
      { id: 789, name: 'ghi' },
    ])).equal('abc, ghi')
  });


  it('自定义 id 和 name', () => {
    expect(filterArrayMulti([123, 789], [
      { key: 123, val: 'abc' },
      { key: 456, val: 'def' },
      { key: 789, val: 'ghi' },
    ], 'key', 'val')).equal('abc, ghi')
  });


  it('自定义 separator', () => {
    expect(filterArrayMulti([123, 789], [
      { key: 123, val: 'abc' },
      { key: 456, val: 'def' },
      { key: 789, val: 'ghi' },
    ], 'key', 'val', ' - ')).equal('abc - ghi')
  });


  it('自定义 emptyDesc', () => {
    expect(filterArrayMulti([123, 7809], [
      { key: 123, val: 'abc' },
      { key: 456, val: 'def' },
      { key: 789, val: 'ghi' },
    ], 'key', 'val', undefined, '---')).equal('abc, ---')
  });

});


describe('filterTime 测试用例', () => {

  it('基本用法', () => {
    // new Date('2019-08-29 8:35:23') = 1567038923000
    expect(filterTime(1567038923000)).equal('2019-08-29 08:35:23');
  });

  it('format: YY,M,D-H,m,s', () => {
    // new Date('2019-08-29 8:35:23') = 1567038923000
    expect(filterTime(1567038923000, 'YY,M,D-H,m,s')).equal('19,8,29-8,35,23');
  });

});


describe('filterMoney 测试用例', () => {

  it('2 -> 2.00', () => {
    expect(filterMoney(2)).equal('2.00');
  });

  it('-2 -> -2.00', () => {
    expect(filterMoney(-2)).equal('-2.00');
  });

  it('0 -> 0.00', () => {
    expect(filterMoney(0)).equal('0.00');
  });

  it('1.2 -> 1.20', () => {
    expect(filterMoney(1.2)).equal('1.20');
  });

  it('1.23 -> 1.23', () => {
    expect(filterMoney(1.23)).equal('1.23');
  });

  it('1.2345 -> 1.23', () => {
    expect(filterMoney(1.2345 )).equal('1.23');
  });

  it('1.2455 -> 1.25', () => {
    expect(filterMoney(1.2455 )).equal('1.25');
  });

  it('387921.2345 -> 387,921.23', () => {
    expect(filterMoney(387921.2345 )).equal('387,921.23');
  });

  it('2387921.2345 -> 2,387,921.23', () => {
    expect(filterMoney(2387921.2345 )).equal('2,387,921.23');
  });

});


describe('filterBoolean 测试用例', () => {

  it('默认值: true -> 是', () => {
    expect(filterBoolean(true)).equal('是');
  });

  it('默认值: false -> 否', () => {
    expect(filterBoolean(false)).equal('否');
  });

  it('自定义 trueDesc', () => {
    expect(filterBoolean(true, 'ok')).equal('ok');
  });

  it('自定义 falseDesc', () => {
    expect(filterBoolean(false, 'ok', 'not ok')).equal('not ok');
  });


});
