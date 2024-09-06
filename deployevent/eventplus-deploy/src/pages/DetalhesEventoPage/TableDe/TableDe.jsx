import React from "react";
import { dateFormatDbToView } from "../../../Utils/stringFunctions"
import { Tooltip } from "react-tooltip";
import "./TableDe.css";

const TableDe = ({dados}) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Comentario
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Autor
          </th>
        </tr>
      </thead>

      <tbody>
        {dados.map((ev) => {
          return (
            <tr className="table-data__head-row" key={ev.idEvento}>
              <td className="table-data__data table-data__data--big">
                {ev.evento.nomeEvento}
              </td>

              <td
                className="table-data__data table-data__data--big"
                data-tooltip-id={ev.idEvento}
                data-tooltip-content={ev.evento.descricao}
                data-tooltip-place="top"
              >
                <Tooltip id={ev.idEvento} className="tooltip" />
                {ev.evento.descricao.substr(0, 15)}
              </td>
              <td className="table-data__data table-data__data--big">
                {dateFormatDbToView(ev.evento.dataEvento)}
              </td>
              <td className="table-data__data table-data__data--big">
                {ev.descricao}
              </td>
              <td className="table-data__data table-data__data--big">
                {ev.usuario.nome}
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableDe;
