/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import style from "./index.module.scss";
import { Edit, DeleteOutline } from "@mui/icons-material";
import { red, grey } from "@mui/material/colors";
import { GridProp } from "../../shared/utils/inteface";
import DeleteDialog from "../confirm";

const Grid: React.FC<GridProp> = (props): JSX.Element => {
  const {
    columns,
    data,
    sxBox,
    action = { edit: true, delete: true },
    message,
    onDelete,
    onEdit,
    loading = false,
    total,
    onFilter,
    initialState,
    getRowHeight,
    isDisableDelete,
  } = props;
  const [header, setHeader] = useState(columns);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [row, setRow] = useState<any>();
  const [isFirst, setIsFirst] = useState(true);
  const [param, setParam] = useState({
    limit: 25,
    page: 1,
    order: "",
    sortBy: "",
  });

  const deleteClicked = (params: any) => {
    setRow(params);
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    if (!isFirst) {
      onFilter(param);
    } else {
      setIsFirst(false);
    }
  }, [param]);

  useEffect(() => {
    if (action.delete || action.edit) {
      setHeader([
        ...columns,
        {
          field: "  ",
          headerName: "  ",
          width: 80,
          sortable: false,
          renderCell(params) {
            return (
              <div className={style.action}>
                {action.edit && (
                  <Edit
                    className="cursor-pointer"
                    onClick={() => {
                      onEdit(params.row);
                    }}
                  />
                )}
                {action.delete && (
                  <DeleteOutline
                    className="cursor-pointer"
                    onClick={() => {
                      if (isDisableDelete && isDisableDelete(params.row))
                        return;
                      deleteClicked(params.row);
                    }}
                    sx={
                      isDisableDelete && isDisableDelete(params.row)
                        ? { color: grey["A400"] }
                        : { color: red["A400"] }
                    }
                  />
                )}
              </div>
            );
          },
        },
      ]);
    }
  }, []);

  function NoRowsOverlay() {
    return (
      <GridOverlay>
        <div>Không có data</div>
      </GridOverlay>
    );
  }
  return (
    <div className={style.grid_container}>
      <Box sx={sxBox}>
        <DataGrid
          disableColumnMenu
          getRowHeight={getRowHeight && getRowHeight}
          rows={data}
          isRowSelectable={() => false}
          columns={header}
          disableSelectionOnClick
          disableColumnSelector
          pageSize={param.limit}
          rowsPerPageOptions={[25, 50, 100]}
          rowCount={total}
          page={param.page - 1}
          components={{
            NoRowsOverlay: NoRowsOverlay,
          }}
          loading={loading}
          initialState={initialState}
          onPageChange={(newPage) => {
            setParam((state) => {
              return { ...state, page: newPage + 1 };
            });
          }}
          onPageSizeChange={(newPageSize) => {
            setParam((state) => {
              return {
                ...state,
                limit: newPageSize,
                page: 1,
              };
            });
          }}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(event) => {
            setParam((state) => {
              return {
                ...state,
                sortBy: event[0] && (event[0].field as string),
                order: event[0] && (event[0].sort as string),
              };
            });
          }}
        />
      </Box>
      <DeleteDialog
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        handleSuccess={() => {
          onDelete(row);
          setOpenDeleteModal(false);
        }}
        message={message}
      />
    </div>
  );
};

export default Grid;
