import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { DispatchersComponent } from "../../../components/internal/DispatchersComponent";
import {
  addNewDispatcherRequest,
  deleteDispatcherRequest,
  getDispatchersFromPageRequest,
  lockDispatcherRequest,
  unlockDispatcherRequest,
  updateZonesOfDispatcherRequest,
} from "../../../services/userService";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import { AddDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/AddDispatcherDialog";
import { LockDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/LockDispatcherDialog";
import { UnlockDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/UnlockDispatcherDialog";
import { UpdateDispatcherZonesDialog } from "../../../components/dialogs/internal/dispatchers/UpdateDispatcherZonesDialog";
import { DeleteDispatcherDialog } from "../../../components/dialogs/internal/dispatchers/DeleteDispatcherDialog";
import { processDispatcherForm, processErrorDispatcherFormOnServerResponse, processErrorDispatcherFormOnSubmit, validateDispatcherFormOnSubmit } from "../../../validations/userRegexValidation";
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
  const [addDispatcherDialogOpen, setAddDispatcherDialogOpen] = useState(false);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedDispatcherId, setSelectedDispatcherId] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [comboBoxError, setComboBoxError] = useState(false);
  const [comboBoxKey, setComboBoxKey] = useState(false); //? Used to just change the key of the comboBox from SettingsComponent2 on successfull submit. Doesn't matter whether it is true/false, it just has to change on successfull submit in order the comboBox to be cleared.   
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dispatcherForm, setDispatcherForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState({
    id: false,
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
  });

  const { data, status, isLoading, error, refetch } = useQuery({
    queryKey: ["getDispatchersFromPage", pageNumber], //? When pageNumber changes, react-query will re-run the query.
    queryFn: () => getDispatchersFromPageRequest(pageNumber),
    enabled: authenticatedUser.role === "ADMIN",
  });

  useEffect(() => {
    setErrorForm(processDispatcherForm(dispatcherForm));
  }, [dispatcherForm]);


  //? Used in order to preven dispatchers from accessing the CmsDispatchersPage by typing its path in the URL. (even though they don't have UI button for it and is forbbiden for them by the backend logic)
  useEffect(() => {
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    if (!isUContextEmpty && authenticatedUser.role !== "ADMIN") {
      //? if user context is NOT empty and user role is NOT ADMIN
      navigate("/cms-dashboard", { replace: true });
    }
  }, [authenticatedUser]);

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

  useEffect(() => {

    if(!searchParams.has("page")) 
    {
      setSearchParams({ page: 1 });
    }
    else
    {
      const newPageNumber = Number(searchParams.get("page"));
  
      //? Validate page number
      if (!Number.isInteger(newPageNumber) || newPageNumber < 1) {
        navigate('*');
        return;
      }
  
      if (newPageNumber !== pageNumber) {
        setPageNumber(newPageNumber);
      }
    }

  }, [searchParams]);

  

  const handleInput = (e) => {
    setDispatcherForm(prevState => ({...prevState,[e.target.name]: e.target.value.trim()}));
    setErrorMessage("");
    setComboBoxError(false);
  };

  const addDispatcherMutation = useMutation({
    mutationFn: addNewDispatcherRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      setAddDispatcherDialogOpen(false);
      setDispatcherForm({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
      setComboBoxKey(comboBoxKey ? false : true);
      setSelectedZoneId(null);
      showSnackbar("Успешно добавихте нов диспечер в системата.","success","bottom","right");
    },
    onError: (error) => {
      if(error?.response?.data === "Id already exists.")
      {
        setErrorForm(processErrorDispatcherFormOnServerResponse("id"));
        setErrorMessage("ЕГН-то, което сте въвели, вече съществува в системата.");
      }
      else if(error?.response?.data === "Email already exists.")
      {
        setErrorForm(processErrorDispatcherFormOnServerResponse("email"));
        setErrorMessage("Имейл адресът, който сте въвели, вече съществува в системата.");
      }
      else if(error?.response?.data === "Username already exists.")
      {
        setErrorForm(processErrorDispatcherFormOnServerResponse("username"));
        setErrorMessage("Потребителското име, което сте въвели, вече съществува в системата.");
      }
      else
      {
        setErrorMessage("Възникна грешка. Моля опитайте отново.");
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
      refetch();
    },
  });

  const handleOpenAddDispatcherDialog = () => {
    closeSnackbar();
    setAddDispatcherDialogOpen(true);
  };

  const handleAddDispatcherConfirm = () => {

    const validationMessage = validateDispatcherFormOnSubmit(dispatcherForm); //If validation passes, validationMessage is ""
    
    if(validationMessage && !selectedZoneId)
    {
      setErrorForm(processErrorDispatcherFormOnSubmit(dispatcherForm, validationMessage));
      setErrorMessage("Моля въведете данни във всички полета.");
      setComboBoxError(true);
    }
    else if(validationMessage)
    {
      setErrorForm(processErrorDispatcherFormOnSubmit(dispatcherForm, validationMessage));
      setErrorMessage(validationMessage);
    }
    else if(!selectedZoneId)
    {
      setComboBoxError(true);
      setErrorMessage("Моля изберете област.");
    }
    else if (!isRequestSent) 
    {
      addDispatcherMutation.mutate(
     {
      id: dispatcherForm.id,
      firstName: dispatcherForm.firstName,
      lastName:dispatcherForm.lastName,
      email:dispatcherForm.email,
      username:dispatcherForm.username,
      password:dispatcherForm.password,
      initialZoneId: selectedZoneId
     }
    );
      setBackdropOpen(true);
    }    
  };

  const handleAddDispatcherDeny = () => {
    setAddDispatcherDialogOpen(false);
    setDispatcherForm({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });
    setErrorForm({
      id: false,
      firstName: false,
      lastName: false,
      email: false,
      username: false,
      password: false,
    });
    setSelectedZoneId(null);
    setErrorMessage("");
    setComboBoxError(false);
  };

  

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
        handleOpenAddDispatcherDialog={handleOpenAddDispatcherDialog}
        handleOpenLockDialog={handleOpenLockDialog}
        handleOpenUnlockDialog={handleOpenUnlockDialog}
        handleOpenUpdateZonesDialog={handleOpenUpdateZonesDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
      />

      <BackdropLoader open={backdropOpen} />

      <AddDispatcherDialog
        open={addDispatcherDialogOpen}
        onAgree={handleAddDispatcherConfirm}
        onDisagree={handleAddDispatcherDeny}
        dispatcherForm={dispatcherForm}
        handleInput={handleInput}
        errorMessage={errorMessage}
        errorForm={errorForm}
        comboBoxKey={comboBoxKey}
        comboBoxError={comboBoxError}
        setComboBoxError={setComboBoxError}
        setSelectedZoneId={setSelectedZoneId}
        setErrorMessage={setErrorMessage}
      />

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
