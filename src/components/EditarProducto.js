import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  // Nuevo state de producto
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: 0
  });

  // Producto a editar
  const productoeditar = useSelector(state => state.productos.productoeditar);

  // Llenar el state automáticamente
  useEffect(() => {
    guardarProducto(productoeditar);
  }, [productoeditar])

  if (!producto) return null;
  const { nombre, precio } = producto;

  // Leer los datos del formulario
  const onChangeFormulario = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const submitEditarProducto = e => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));

    history.push('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form
              onSubmit={submitEditarProducto}
            >
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  id="nombre"
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio Producto</label>
                <input
                  id="precio"
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
