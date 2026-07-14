import test from 'node:test';import assert from 'node:assert/strict';import {sourceScore,linkClaims,findContradictions,coverage,fixtures} from '../engine.js';
test('primary audit scores above contextual release',()=>assert.ok(sourceScore(fixtures.sources[4]).score>sourceScore(fixtures.sources[5]).score));
test('every fixture claim links to stored evidence',()=>assert.ok(linkClaims(fixtures.claims,fixtures.sources).every(c=>c.evidence.length>0)));
test('contradiction detector preserves disagreeing values',()=>{const x=findContradictions(fixtures.claims);assert.equal(x.length,1);assert.equal(x[0].claims.length,2)});
test('coverage reports precise gaps',()=>{const x=coverage(fixtures.claims,['San Francisco','San José','Oakland'],['status','funding','outcomes']);assert.ok(x.percent>0&&x.percent<100);assert.ok(x.gaps.length>0)});
