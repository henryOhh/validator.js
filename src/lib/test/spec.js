const { expect } = require('chai');
const Fx = require('../index.js');

const {
  L, flat, deepFlat, stop,
  take, C, takeWhile, takeUntil, go,
  takeAll,
  map,
  reduce, go1, find, some, every, deepFlatten, uniq,
  reduceS, goS, stopIf, stop_if, pipeS, calls, callsC,
  mapObject,
  promiseAllObject, promiseAllEntries,
  dropRight,
} = Fx;

(function() {

  describe('drop', function () {
    it('L.drop', () => {
      expect(takeAll(L.drop(1, [1, 2, 3, 4, 5]))).to.eql([2, 3, 4, 5]);
      expect(takeAll(L.drop(2, [1, 2, 3, 4, 5]))).to.eql([3, 4, 5]);
      expect(takeAll(L.drop(4, [1, 2, 3, 4, 5]))).to.eql([5]);
      expect(takeAll(L.drop(5, [1, 2, 3, 4, 5]))).to.eql([]);
      expect(takeAll(L.drop(6, [1, 2, 3, 4, 5]))).to.eql([]);
    });
    it('L.drop promise', async () => {
      expect(await takeAll(L.drop(1, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5])))).to.eql([2, 3, 4, 5]);
      expect(await takeAll(L.drop(2, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5])))).to.eql([3, 4, 5]);
      expect(await takeAll(L.drop(4, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5])))).to.eql([5]);
      expect(await takeAll(L.drop(5, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5])))).to.eql([]);
      expect(await takeAll(L.drop(6, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5])))).to.eql([]);
    });
    it('C.drop', async () => {
      expect(await C.drop(1, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([2, 3, 4, 5]);
      expect(await C.drop(2, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([3, 4, 5]);
      expect(await C.drop(4, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([5]);
      expect(await C.drop(5, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([]);
      expect(await C.drop(6, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([]);
    });
  });

  describe('dropRight', function () {
    it('dropRight', () => {
      expect(dropRight(1, [1, 2, 3, 4, 5])).to.eql([1, 2, 3, 4]);
      expect(dropRight(2, [1, 2, 3, 4, 5])).to.eql([1, 2, 3]);
      expect(dropRight(4, [1, 2, 3, 4, 5])).to.eql([1]);
      expect(dropRight(5, [1, 2, 3, 4, 5])).to.eql([]);
      expect(dropRight(6, [1, 2, 3, 4, 5])).to.eql([]);
    });
    it('dropRight promise', async () => {
      expect(await dropRight(1, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([1, 2, 3, 4]);
      expect(await dropRight(2, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([1, 2, 3]);
      expect(await dropRight(4, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([1]);
      expect(await dropRight(5, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([]);
      expect(await dropRight(6, L.map(a => Promise.resolve(a), [1, 2, 3, 4, 5]))).to.eql([]);
    });
  });

  describe('L.range', function () {
    it('L.range(0)', () => {
      expect([...L.range(0)]).to.eql([]);
    });
    it('L.range(3)', () => {
      expect([...L.range(3)]).to.eql([0, 1, 2]);
    });
    it('L.range(1, 3)', () => {
      expect([...L.range(1, 3)]).to.eql([1, 2]);
    });
    it('L.range(-1, 2)', () => {
      expect([...L.range(-1, 2)]).to.eql([-1, 0, 1]);
    });
    it('L.range(0, 7, 2)', () => {
      expect([...L.range(0, 7, 2)]).to.eql([0, 2, 4, 6]);
    });
    it('L.range(1, 7, 2)', () => {
      expect([...L.range(1, 7, 2)]).to.eql([1, 3, 5]);
    });
  });

  describe('flatten, deepFlatten', function () {
    it('flat([[], [], []])', () => {
      expect(flat([[], [], []])).to.eql([]);
    });

    it('flat([Promise.resolve([], [], [])])', async () => {
      expect(await flat([Promise.resolve([], [], [])])).to.eql([]);
    });

    it('flat([Promise.resolve([]), [], Promise.resolve([])])', async () => {
      expect(await flat([Promise.resolve([]), [], Promise.resolve([])])).to.eql([]);
    });

    it('flat([0, [1, [2], 3], 4, [5, [6], 7], 8])', () => {
      expect(flat([0, [1, [2], 3], 4, [5, [6], 7], 8])).to.eql([0, 1, [2], 3, 4, 5, [6], 7, 8]);
    });

    it('flat([0, Promise.resolve([1, [2, 3], 4]), Promise.resolve(5)])', async () => {
      expect(await flat([0, Promise.resolve([1, [2, 3], 4]), Promise.resolve(5)])).to.eql([0, 1, [2, 3], 4, 5]);
    })

    it('flat([0, [1, Promise.resolve([2, 3]), 4], 5])', async () => {
      expect(await flat([0, [1, Promise.resolve([2, 3]), 4], Promise.resolve(5)])).to.eql([0, 1, [2, 3], 4, 5]);
    });

    it('flat([Promise.resolve("01"), "23", [Promise.resolve(["45"]), "67"], "89"])', async () => {
      expect(await flat([Promise.resolve("01"), "23", [Promise.resolve(["45"]), "67"], "89"])).to.eql(["01", "23", ["45"], "67", "89"]);
    });

    it('deepFlat([[[]]])', () => {
      expect(deepFlat([[[]]])).to.eql([])
    });
    it('deepFlat([0, Promise.resolve([1, Promise.resolve([2, 3]), 4]), Promise.resolve(5), 6])', async () => {
      expect(await deepFlat([0, Promise.resolve([1, Promise.resolve([2, 3]), 4]), Promise.resolve(5), 6])).to.eql([0, 1, 2, 3, 4, 5, 6]);
    });
  });

  describe('take', function () {
    it('take(1, [1, 2, 3])', () => {
      expect(take(1, [1, 2, 3])).to.eql([1]);
    });
    it('take(2, [1, 2, 3])', () => {
      expect(take(2, [1, 2, 3])).to.eql([1, 2]);
    });

    it('take(2, L.map(a => a + 1, [1, 2, 3]))', () => {
      expect(take(2, L.map(a => a + 1, [1, 2, 3]))).to.eql([2, 3]);
    });

    it('take(2, L.filter(a => a % 2, [1, 2, 3, 4, 5]))', () => {
      expect(take(2, L.filter(a => a % 2, [1, 2, 3, 4, 5]))).to.eql([1, 3]);
    });

    it('take(2, L.map(a => Promise.resolve(a + 1), [1, 2, 3]))', () => {
      go1(
        take(2, L.map(a => Promise.resolve(a + 1), [1, 2, 3])),
        _ => expect(_).to.eql([2, 3])
      );
    });

    it('take(2, L.filter(a => Promise.resolve(a % 2), [1, 2, 3, 4, 5]))', () => {
      go1(
        take(2, L.filter(a => Promise.resolve(a % 2), [1, 2, 3])),
        _ => expect(_).to.eql([1, 3])
      );
    });

    it('takeWhile', async () => {
      expect(takeWhile(a => a, [1, 2, 0, 4])).to.eql([1, 2]);

      expect((await go(L.range(Infinity),
        L.map(a => Promise.resolve(a)),
        takeWhile(a => a < 3)))).to.eql([0, 1, 2]);
    });

    it('takeUntil', async () => {
      expect(takeUntil(a => a, [1, 2, 0, 4])).to.eql([1]);
      expect(takeUntil(a => !a, [1, 2, 0, 4])).to.eql([1, 2, 0]);

      expect((await go(L.range(Infinity),
        L.map(a => Promise.resolve(a)),
        takeUntil(a => a > 3)))).to.eql([0, 1, 2, 3, 4]);
    });

    it('takeUntil, L.flat', async () => {
      expect(await go(L.range(Infinity),
        L.map(a => Promise.resolve([a, a])),
        L.flat,
        takeUntil((_, res) => res.length == 7))).to.eql([0, 0, 1, 1, 2, 2, 3]);
    });
  });

  describe('reduce', function () {
    const add = (a, b) => a + b;
    it('reduce(add, [1, 2, 3])', () => {
      expect(reduce(add, [1, 2, 3])).to.eql(6);
    });
    it('reduce(add, 10, [1, 2, 3])', () => {
      expect(reduce(add, 10, [1, 2, 3])).to.eql(16);
    });
    it('reduce(add, L.values({a: 1, b: 2, c: 3}))', () => {
      expect(reduce(add, L.values({a: 1, b: 2, c: 3}))).to.eql(6);
    });
    it('reduce(add, [Promise.resolve(1), 2, 3])', () => {
      go1(reduce(add, [Promise.resolve(1), 2, 3]), _ => expect(_).to.eql(6));
    });
    it('reduce(add, L.filter(a => a % 2, [1, 2, 3, 4]))', () => {
      expect(reduce(add, L.filter(a => a % 2, [1, 2, 3, 4]))).to.eql(4);
    });
    it('reduce(add, L.filter(a => Promise.resolve(a % 2), [1, 2, 3, 4]))', () => {
      go1(reduce(add, L.filter(a => Promise.resolve(a % 2), [1, 2, 3, 4])), _ => expect(_).to.eql(4));
    });
    it('reduce(add, L.filter(a => Promise.resolve(a % 2), L.map(a => a + 10, [1, 2, 3, 4])))', () => {
      go1(reduce(add, L.filter(a => Promise.resolve(a % 2), L.map(a => a + 10, [1, 2, 3, 4]))), _ => expect(_).to.eql(24));
    });
    it('reduce(add, L.filter(a => Promise.resolve(a % 2), L.map(a => Promise.resolve(a + 10), [1, 2, 3, 4])))', () => {
      go1(reduce(add, L.filter(a => Promise.resolve(a % 2), L.map(a => Promise.resolve(a + 10), [1, 2, 3, 4]))), _ => expect(_).to.eql(24));
    });
  });

  describe('C.take', function () {
    function delay(val, time = 1000) {
      return new Promise(resolve => setTimeout(_ => resolve(val), time));
    }

    it('C.take(2, L.map(a => delay(a, a * 100), [1, 2, 3]))', () => {
      go1(
        C.take(2, L.map(a => delay(a, 100), [1, 2, 3])),
        _ => expect(_).to.eql([1, 2])
      );
    });

    it('C.take(2, L.filter(a => delay(a % 2, a * 100), [1, 2, 3]))', () => {
      go1(
        C.take(2, L.filter(a => delay(a % 2, 100), [1, 2, 3])),
        _ => expect(_).to.eql([1, 3])
      );
    });
  });

  describe('map', function () {
    function delay(val, time = 1000) {
      return new Promise(resolve => setTimeout(_ => resolve(val), time));
    }

    it('map(a => delay(a+10, 1000), [1, 2, 3])', async function () {
      expect(await map(a => a + 10, [Promise.resolve(1), 2, 3])).to.eql([11, 12, 13]);
    });

    it('map(a => delay(a+10, 1000), [1, 2, 3])', async function () {
      this.timeout(5000);
      expect(await map(a => delay(a + 10, 1000), [1, 2, 3])).to.eql([11, 12, 13]);
    });

    it('C.map(a => delay(a+10, 1000), [1, 2, 3])', async function () {
      this.timeout(1500);
      expect(await C.map(a => delay(a + 10, 1000), [1, 2, 3])).to.eql([11, 12, 13]);
    });
  });

  describe('find', function () {
    it('find(a => a > 1, [1, 2, 3])', function () {
      expect(find(a => a > 1, [1, 2, 3])).to.eql(2);
    });

    it('some(a => a > 1, [1, 2, 3])', function () {
      expect(some(a => a > 1, [1, 2, 3])).to.eql(true);
    });

    it('every(a => a > 1, [1, 2, 3])', function () {
      expect(every(a => a > 1, [1, 2, 3])).to.eql(false);
      expect(every(a => a < 3, [1, 2, 3])).to.eql(false);
    });

    it('every(a => a > 0, [1, 2, 3])', function () {
      expect(every(a => a > 0, [1, 2, 3])).to.eql(true);
    });
  });

  describe('uniq', function () {
    it('uniq([1, 2, 3, 1, 2, 3, 4])', function () {
      expect(uniq([1, 2, 3, 1, 2, 3, 4])).to.eql([1, 2, 3, 4]);
    });

    it('uniq({a: 1, b: 2, c: 3, d: 1, e: 2, f: 4})', function () {
      expect(uniq({a: 1, b: 2, c: 3, d: 1, e: 2, f: 4})).to.eql({a: 1, b: 2, c: 3, f: 4});
    });
  });

  describe('go', function () {
    it(`
    go(
      0,
      a => a + 1,
      a => a + 10,
      a => a + 100)`, function () {
      expect(
        go(
          0,
          a => a + 1,
          a => a + 10,
          a => a + 100)).to.eql(111)
    });

    it(`
    go(
      0,
      a => { throw { hi: 'ho' } },
      a => a + 10,
      a => a + 100)`, function () {
      try {
        go(
          0,
          a => {
            throw {hi: 'ho'}
          },
          a => a + 10,
          a => a + 100)
      } catch (a) {
        expect(a).to.eql({hi: 'ho'})
      }
    });

    it(`
    go(
      0,
      a => Promise.resolve(a + 1),
      a => a + 10,
      a => a + 100)`, async function () {
      expect(
        await go(
          0,
          a => Promise.resolve(a + 1),
          a => a + 10,
          a => a + 100)).to.eql(111)
    });

    it(`
    go(
      0,
      a => Promise.resolve(a + 1),
      a => Promise.reject({ hi: 'ho' }),
      a => a + 100)`, async function () {
      try {
        await go(
          0,
          a => Promise.resolve(a + 1),
          a => Promise.reject({hi: 'ho'}),
          a => a + 100)
      } catch (a) {
        expect(a).to.eql({hi: 'ho'})
      }
    });

    it(`
    go(
      0,
      a => Promise.resolve(a + 1),
      a => { throw { hi: 'ho' } },
      a => a + 100)`, async function () {
      try {
        await go(
          0,
          a => Promise.resolve(a + 1),
          a => {
            throw {hi: 'ho'}
          },
          a => a + 100)
      } catch (a) {
        expect(a).to.eql({hi: 'ho'})
      }
    });
  });

  describe('flatten', function () {
    it(`deepFlatten([1, 2, [3]])`, function () {
      expect(deepFlatten([1, 2, [3]])).to.eql([1, 2, 3])
    });
  });

  describe('goS', function () {
    it(`goS`, function () {
      expect(
        reduceS((a, b) => {
          const res = a + b;
          return res > 5 ? stop(res) : res;
        }, [1, 2, 3, 4])).to.eql(6);

      expect(goS(1, a => a % 2 ? stop(a) : a, a => a + 10)).to.eql(1);
      expect(goS(2, a => a % 2 ? stop(a) : a, a => a + 10)).to.eql(12);
      expect(goS(1, stopIf(a => a % 2), a => a + 10)).to.eql(1);
      expect(goS(2, stop_if(a => a % 2), a => a + 10)).to.eql(12);

      const f1 = pipeS(a => a % 2 ? stop(a) : a, a => a + 10);
      const f2 = pipeS(stopIf(a => a % 2), a => a + 10);

      expect(f1(1)).to.eql(1);
      expect(f1(2)).to.eql(12);
      expect(f2(1)).to.eql(1);
      expect(f2(2)).to.eql(12);

      expect(goS(1, stopIf(1), a => a + 10)).to.eql(1);
      expect(goS({a: 1, b: 2}, stopIf({a: 1}), ({a, b}) => ({a: a + 10, b}))).to.eql({a: 1, b: 2});
      expect(goS({a: 2, b: 2}, stopIf({a: 1}), ({a, b}) => ({a: a + 10, b}))).to.eql({a: 12, b: 2});
      expect(goS({a: 1, b: 2}, stopIf({a: 1}, null), ({a, b}) => ({a: a + 10, b}))).to.eql(null);
    });
  });

  describe('calls', function () {
    it(`calls`, async function () {
      expect(await calls([
        _ => Promise.resolve(1),
        _ => Promise.resolve(2),
        _ => Promise.resolve(3)
      ])).to.eql([1, 2, 3]);

      expect(await calls({
        a: _ => Promise.resolve(1),
        b: _ => Promise.resolve(2),
        c: _ => Promise.resolve(3)
      })).to.eql({a: 1, b: 2, c: 3});
    });

    it(`callsC`, async function () {
      expect(await callsC([
        _ => Promise.resolve(1),
        _ => Promise.resolve(2),
        _ => Promise.resolve(3)
      ])).to.eql([1, 2, 3]);

      expect(await callsC({
        a: _ => Promise.resolve(1),
        b: _ => Promise.resolve(2),
        c: _ => Promise.resolve(3)
      })).to.eql({a: 1, b: 2, c: 3});
    });
  });

  describe('mapObject', function () {
    it(`mapObject(a => a + 1, { a: 1, b: 2})`, function () {
      expect(mapObject(a => a + 1, {a: 1, b: 2})).to.eql({a: 2, b: 3})
    });

    it(`mapObject(a => Promise.resolve(a + 1), { a: 1, b: 2})`, async function () {
      expect(await mapObject(a => Promise.resolve(a + 1), {a: 1, b: 2})).to.eql({a: 2, b: 3})
    });
  });

  describe('promiseAll...', function () {
    it(`promiseAllObject({ a: Promise.resolve(1), b: Promise.resolve(2)})`, async function () {
      expect(await promiseAllObject({a: Promise.resolve(1), b: Promise.resolve(2)})).to.eql({a: 1, b: 2})
    });

    it(`promiseAllEntries(Object.entries({ a: Promise.resolve(1), b: Promise.resolve(2)}))`, async function () {
      expect(await promiseAllEntries(Object.entries({
        a: Promise.resolve(1),
        b: Promise.resolve(2)
      }))).to.eql(Object.entries({a: 1, b: 2}))
    });
  });


} ());