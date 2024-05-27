import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { DispatchersComponent } from "../../../components/internal/DispatchersComponent";
import {
  deleteDispatcherRequest,
  getDispatchersFromPageRequest,
  lockDispatcherRequest,
  unlockDispatcherRequest,
  updateZonesOfDispatcherRequest,
} from "../../../services/userService";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import { LockDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/LockDispatcherDialog";
import { UnlockDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/UnlockDispatcherDialog";
import { UpdateDispatcherZonesDialog } from "../../../components/dialogs/internal/dispatchers/UpdateDispatcherZonesDialog";
import { DeleteDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/DeleteDispatcherDialog";
import "./cms_dispatchers_page.scss";

export const CmsDispatchersPage = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get("page")) || 1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState([]);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lockDialogOpen, setLockDialogOpen] = useState(false);
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [updateZonesDialogOpen, setUpdateZonesDialogOpen] = useState(false);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedDispatcherId, setSelectedDispatcherId] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);


  const { data, status, isLoading, error, refetch } = useQuery({
    queryKey: ["getDispatchersFromPage", pageNumber], //? When pageNumber changes, react-query will re-run the query.
    queryFn: () => getDispatchersFromPageRequest(pageNumber),
    enabled: isQueryEnabled
  });


  //? Used in order to preven dispatchers from accessing the CmsDispatchersPage by typing its path in the URL. (even though they don't have UI button for it and is forbbiden for them by the backend logic)
  useEffect(() => {
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    if (!isUContextEmpty && authenticatedUser.role !== "ADMIN") {
      //? if user context is NOT empty and user role is NOT ADMIN
      navigate("/cms-dashboard", { replace: true });
    }
  }, [authenticatedUser]);

  useEffect(() => {
    const isUContextEmpty = isUserContextEmpty();

    if(!isUContextEmpty && authenticatedUser.role === "ADMIN")
    {
      const initialParams = {};
      if(!searchParams.has("page")) {initialParams.page = 1;}

      if (Object.keys(initialParams).length > 0) 
      {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...initialParams });
      }
      else
      {
        const newPageNumber = Number(searchParams.get("page"));
      
        //? Validate page number
        if (!Number.isInteger(newPageNumber) || newPageNumber < 1) {
          navigate('*');
          return;
        }
      
        if (newPageNumber !== pageNumber) {setPageNumber(newPageNumber);}

        setIsQueryEnabled(true);//? all validations passed and authenticatedUser is present AND IS ADMIN
      }
    }

    
  }, [searchParams, authenticatedUser]);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingComponent(true);
    }

    if (status === "success") {
      const newPages = data.data.totalPages;
      const newRows = data.data.content.map((item, index) => {
        const rowNumber = (pageNumber - 1) * 15 + index + 1; //? Calculate rowNumber based on the index, pageNumber and pageSize(15 - set in the backend)
        return {
          number: rowNumber,
          id: item.id,
          name: item.name,
          email: item.email,
          username: item.username,
          status: item.status,
          activity: item.activity,
          availableZoneIds: item.availableZoneIds,
        };
      });

      setPages(newPages);
      setRows(newRows);
      setIsLoadingComponent(false);
      setBackdropOpen(false);
    }

    if (status === "error") 
    {
      if (error?.response?.data === "Invalid type of id.") 
      {
        showSnackbar("Невалидно ЕГН.", "error", "bottom", "right");
      } 
      else if (error?.response?.data === "Id doesn't exist.") 
      {
        showSnackbar("Диспечерът, когото сте избрали не съществува.","error","bottom","right");
      } 
      else 
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      }
      setRows([]);
      setPages(0);
      setIsLoadingComponent(false);
      setBackdropOpen(false);
    }
  }, [status, data, error]);

  

  const lockDispatcherMutation = useMutation({
    mutationFn: lockDispatcherRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      showSnackbar("Акаунтът на диспечера беше успешно заключен.","success","bottom","right");
    },
    onError: (error) => {
      if (error?.response?.data === "Id doesn't exist.") 
      {
        showSnackbar("Диспечерът вече не съществува в системата.","error","bottom","right");
      } 
      else 
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
      setSelectedDispatcherId(null); //? Clear selected dispatcher(row) id
      refetch();
    },
  });

  const handleOpenLockDialog = (dispatcherId) => {
    closeSnackbar();
    setSelectedDispatcherId(dispatcherId);
    setLockDialogOpen(true);
  };

  const handleLockAgree = () => {
    if (selectedDispatcherId && !isRequestSent) {
      lockDispatcherMutation.mutate(selectedDispatcherId);
      setBackdropOpen(true);
    }
    setLockDialogOpen(false);
  };

  const handleLockDisagree = () => {
    setLockDialogOpen(false);
    setSelectedDispatcherId(null);
  };

  const unlockDispatcherMutation = useMutation({
    mutationFn: unlockDispatcherRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      showSnackbar("Акаунтът на диспечера беше успешно отключен.","success","bottom","right");
    },
    onError: (error) => {
      if (error?.response?.data === "Id doesn't exist.") 
      {
        showSnackbar("Диспечерът вече не съществува в системата.","error","bottom","right");
      } 
      else 
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
      setSelectedDispatcherId(null); //? Clear selected dispatcher(row) id
      refetch();
    },
  });

  const handleOpenUnlockDialog = (dispatcherId) => {
    closeSnackbar();
    setSelectedDispatcherId(dispatcherId);
    setUnlockDialogOpen(true);
  };

  const handleUnlockAgree = () => {
    if (selectedDispatcherId && !isRequestSent) {
      unlockDispatcherMutation.mutate(selectedDispatcherId);
      setBackdropOpen(true);
    }
    setUnlockDialogOpen(false);
  };

  const handleUnlockDisagree = () => {
    setUnlockDialogOpen(false);
    setSelectedDispatcherId(null);
  };

  const updateZonesOfDispatcherMutation = useMutation({
    mutationFn: updateZonesOfDispatcherRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      showSnackbar("Списъкът с области на диспечера, беше успешно актуализиран.","success","bottom","right");
    },
    onError: (error) => {
      if (error?.response?.data === "Id doesn't exist.") 
      {
        showSnackbar("Диспечерът вече не съществува в системата.","error","bottom","right");
      } 
      else 
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
      setSelectedDispatcherId(null); //? Clear selected dispatcher(row) id
      setSelectedZones([]);
      refetch();
    },
  });

  const handleOpenUpdateZonesDialog = (dispatcherId, availableZoneIds) => {
    closeSnackbar();
    setSelectedDispatcherId(dispatcherId);
    setSelectedZones(availableZoneIds);
    setUpdateZonesDialogOpen(true);
  };

  const handleUpdateZonesConfirm = (updatedZones) => {
    if (selectedDispatcherId && !isRequestSent) {
      updateZonesOfDispatcherMutation.mutate({
        id: selectedDispatcherId,
        zoneIds: updatedZones,
      });
      setBackdropOpen(true);
    }
    setUpdateZonesDialogOpen(false);
  };

  const handleUpdateZonesDeny = () => {
    setUpdateZonesDialogOpen(false);
    setSelectedDispatcherId(null);
    setSelectedZones([]);
  };

  const deleteDispatcherMutation = useMutation({
    mutationFn: deleteDispatcherRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      showSnackbar("Акаунтът на диспечера беше успешно премахнат.","success","bottom","right");
    },
    onError: (error) => {
      if (error?.response?.data === "Id doesn't exist.") 
      {
        showSnackbar("Диспечерът вече не съществува в системата.","error","bottom","right");
      } 
      else 
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
      setSelectedDispatcherId(null); //? Clear selected dispatcher(row) id
      refetch();
    },
  });

  const handleOpenDeleteDialog = (dispatcherId) => {
    closeSnackbar();
    setSelectedDispatcherId(dispatcherId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteAgree = () => {
    if (selectedDispatcherId && !isRequestSent) {
      deleteDispatcherMutation.mutate(selectedDispatcherId);
      setBackdropOpen(true);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteDisagree = () => {
    setDeleteDialogOpen(false);
    setSelectedDispatcherId(null);
  };

  const handlePageChange = (event, newPageNumber) => {
    //! event here is used only as argument to avoid "Converting circular structure to JSON" error
    if (newPageNumber !== pageNumber) {
      setPageNumber(newPageNumber); //? This will trigger the useQuery fetch because of the queryKey dependency
      setSearchParams({page: newPageNumber});
      closeSnackbar();
    }
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };

  return (
    <div className="cms_dispatchers_page">
      <DispatchersComponent
        status={status}
        isLoadingComponent={isLoadingComponent}
        handlePageChange={handlePageChange}
        pageNumber={pageNumber}
        pages={pages}
        rows={rows}
        handleOpenLockDialog={handleOpenLockDialog}
        handleOpenUnlockDialog={handleOpenUnlockDialog}
        handleOpenUpdateZonesDialog={handleOpenUpdateZonesDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
      />

      <BackdropLoader open={backdropOpen} />

      <LockDispatcherDialog
        open={lockDialogOpen}
        onAgree={handleLockAgree}
        onDisagree={handleLockDisagree}
      />

      <UnlockDispatcherDialog
        open={unlockDialogOpen}
        onAgree={handleUnlockAgree}
        onDisagree={handleUnlockDisagree}
      />

      <UpdateDispatcherZonesDialog
        open={updateZonesDialogOpen}
        onAgree={handleUpdateZonesConfirm}
        onDisagree={handleUpdateZonesDeny}
        initialZones={selectedZones}
      />

      <DeleteDispatcherDialog
        open={deleteDialogOpen}
        onAgree={handleDeleteAgree}
        onDisagree={handleDeleteDisagree}
      />

      <Snackbar
        anchorOrigin={{
          vertical: position.vertical,
          horizontal: position.horizontal,
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
