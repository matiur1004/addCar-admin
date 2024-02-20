import { FranchiseesModule } from './franchisees.module';

describe('FranchiseesModule', () => {
  let testedModule: FranchiseesModule;

  beforeEach(() => {
    testedModule = new FranchiseesModule();
  });

  it('should create an instance', () => {
    expect(testedModule).toBeTruthy();
  });
});
