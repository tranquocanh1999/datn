import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./index.scss";
import { Edit, DeleteOutline } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { red } from "@mui/material/colors";
interface GridProp {
  columns: GridColDef[];
  data: any;
  sxBox: { height: number | string; width: string };
  action?: { edit?: boolean; delete?: boolean };
}
const Grid: React.FC<GridProp> = (props): JSX.Element => {
  const { columns, data, sxBox, action = { edit: true, delete: true } } = props;
  const [header, setHeader] = useState(columns);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const deleteClicked = (params: any) => {
    console.log(params);
  };
  useEffect(() => {
    if (action.delete || action.edit) {
      setHeader([
        ...columns,
        {
          field: "  ",
          headerName: "  ",
          width: 150,
          sortable: false,
          renderCell(params) {
            return (
              <div className="actions">
                <Edit />
                <DeleteOutline
                  onClick={() => {
                    deleteClicked(params.row);
                  }}
                  sx={{ color: red["A400"] }}
                />
              </div>
            );
          },
        },
      ]);
    }
  }, []);
  return (
    <div className="grid-container">
      <Box sx={sxBox}>
        <DataGrid
          disableColumnMenu
          rows={data}
          isRowSelectable={() => false}
          columns={header}
        />
      </Box>
    </div>
  );
};

export default Grid;
