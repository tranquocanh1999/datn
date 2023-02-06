import { GridColDef } from "@mui/x-data-grid";

export interface DeleteDialogProps {
  open: boolean;
  message: string;
  handleClose: any;
  handleSuccess: any;
}

export interface ClassDetailProps {
  open: boolean;
  classes: any;
  handleClose: any;
}

export interface InputProp {
  name: string;
  errorText: string;
  label: string;
  placeholder?: string;
  value: string | number | string[] | number[];
  type?: string;
  className?: string;
  onChange?: any;
  number?: boolean;
  disabled?: boolean;
  row?: number;
  required?: boolean;
  data?: any;
  isEdit?: boolean;
  children?: any;
  multiple?: boolean;
}

export interface GridProp {
  columns: GridColDef[];
  data: any;
  sxBox: { height: number | string; width: string };
  action?: { edit?: boolean; delete?: boolean };
  message: string;
  onDelete?: any;
  onEdit?: any;
  loading?: boolean;
  total: number;
  onFilter?: any;
  initialState: any;
  getRowHeight?: any;
  isDisableDelete?: (e: any) => boolean;
}

export interface FormProps {
  open: boolean;
  data?: any;
  isEdit?: boolean;
  handleClose: any;
}

export interface filter {
  page: number;
  perPage: number;
  filters?: any;
  sort?: any;
}
