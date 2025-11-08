const Table = ({ columns = [], data = [], renderActions }) => {
  if (!data.length) {
    return <p className="rounded border border-dashed border-slate-300 p-4 text-center text-sm">Sem itens.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-2 text-left font-semibold text-slate-700">
                {col.header}
              </th>
            ))}
            {renderActions && <th className="px-4 py-2 text-left font-semibold text-slate-700">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row) => (
            <tr key={row.id || row.email} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-2 text-slate-700">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
              {renderActions && <td className="px-4 py-2">{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
