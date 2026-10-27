import * as migration_20261023_141538_initial from './20261023_141538_initial';
import * as migration_20261023_190032_schema_update from './20261023_190032_schema_update';
import * as migration_20261026_195936_site_sections from './20261026_195936_site_sections';
import * as migration_20261027_150831_schema_update from './20261027_150831_schema_update';

export const migrations = [
  {
    up: migration_20261023_141538_initial.up,
    down: migration_20261023_141538_initial.down,
    name: '20261023_141538_initial',
  },
  {
    up: migration_20261023_190032_schema_update.up,
    down: migration_20261023_190032_schema_update.down,
    name: '20261023_190032_schema_update',
  },
  {
    up: migration_20261026_195936_site_sections.up,
    down: migration_20261026_195936_site_sections.down,
    name: '20261026_195936_site_sections',
  },
  {
    up: migration_20261027_150831_schema_update.up,
    down: migration_20261027_150831_schema_update.down,
    name: '20261027_150831_schema_update'
  },
];
