import { VersionsModule } from './versions.module';

describe('VersionsModule', () => {
  let testedModule: VersionsModule;

  beforeEach(() => {
    testedModule = new VersionsModule();
  });

  it('should create an instance', () => {
    expect(testedModule).toBeTruthy();
  });
});
