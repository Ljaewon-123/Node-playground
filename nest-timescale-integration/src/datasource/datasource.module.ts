import { DataSource } from 'typeorm';
import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { dataSource } from 'src/connection/data-source';
import { DatasourceService } from './datasource.service';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource, // add the datasource as a provider
      inject: [],
      useFactory: async () => {
        // using the factory function to create the datasource instance
        try {
          await dataSource.initialize(); // initialize the data source
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
    DatasourceService,
  ],
  exports: [DataSource],
})
export class DatasourceModule implements OnModuleInit, OnModuleDestroy {
  constructor(private service: DatasourceService){}
  async onModuleInit() {
    console.log(`The datasource module has been initialized.`);
    Promise.all([
      this.service.coinbaseView(),
      this.service.transaction1View(),
      this.service.blockView()
    ])
  }
  async onModuleDestroy() {
    await dataSource.destroy()
  }
}
