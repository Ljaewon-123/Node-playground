import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  accumulated: AccumulatedTable
  etcDevice: DeviceEtcTable
}

export interface AccumulatedTable {
  seq_id: Generated<number>
  plc_date: Date
  today_accumulate_charge: number
  today_accumulate_discharge: number
  today_accumulate_energy: number
  site_id: number
  device_no: number
}

export type Accumulated = Selectable<AccumulatedTable>
export type NewAccumulated = Insertable<AccumulatedTable>
export type AccumulatedUpdate = Updateable<AccumulatedTable>

export interface DeviceEtcTable {
  seq_id: Generated<number>
  plc_date: Date
  site_id: number
  device_no: number
  etc_no: number
  data_type: number
  value: number
  location: number
  room_no: number
}

export type DeviceEtc = Selectable<DeviceEtcTable>
export type NewDeviceEtc = Insertable<DeviceEtcTable>
export type DeviceEtcUpdate = Updateable<DeviceEtcTable>
