import { GridColDef } from "@mui/x-data-grid";

export interface ConfirmDialogProps {
  open: boolean;
  message: string;
  handleClose: any;
  handleSuccess: any;
}

export interface InputProp {
  name: string;
  errorText: string;
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  className?: string;
  onChange?: any;
  number?: boolean;
  row?: number;
  required?: boolean;
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
}

export interface FormProps {
  open: boolean;
  data?: any;
  isEdit?: boolean;
  handleClose: any;
}
