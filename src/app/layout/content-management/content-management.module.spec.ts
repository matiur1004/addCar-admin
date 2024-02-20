import { ContentManagementModule } from "./content-management.module";

describe('ContentManagementModule', () => {
  let testedModule: ContentManagementModule;

  beforeEach(() => {
    testedModule = new ContentManagementModule();
  });

  it('should create an instance', () => {
    expect(testedModule).toBeTruthy();
  });
});
