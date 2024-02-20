
import { VehiclesModule } from 'vehicles.module.ts';

describe('VehiclesModule', () => {
    let testedModule: VehiclesModule;

    beforeEach(() => {
        testedModule = new VehiclesModule();
    });

    it('should create an instance', () => {
        expect(testedModule).toBeTruthy();
    });
});
