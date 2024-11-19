import React, { useState } from "react";
<Modal open={open} onClose={handleClose}>
<Box sx={style}>
  <Typography variant="h6" component="h2">
    Agregar Nuevo Elemento
  </Typography>
  <TextField
    label="Nuevo Elemento"
    value={newElement}
    onChange={handleNewElementChange}
    fullWidth
    margin="normal"
  />
  <Button onClick={handleAddElement} variant="contained" color="primary">
    Agregar
  </Button>
</Box>
</Modal>