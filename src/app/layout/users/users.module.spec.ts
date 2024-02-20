import { UsersModule } from './users.module';

describe('UsersModule', () => {
  let testedModule: UsersModule;

  beforeEach(() => {
    testedModule = new UsersModule();
  });

  it('should create an instance', () => {
    expect(testedModule).toBeTruthy();
  });
});
