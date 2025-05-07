import {
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  accumulated: AccumulatedTable
  etc: EtcTable
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

export interface EtcTable {
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

export type DeviceEtc = Selectable<EtcTable>
export type NewDeviceEtc = Insertable<EtcTable>
export type DeviceEtcUpdate = Updateable<EtcTable>
