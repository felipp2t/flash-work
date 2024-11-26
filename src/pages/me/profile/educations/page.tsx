import { PageTitle } from "@/components/page-title";
import { getEducationsByUser } from "@/http/user/get-education-by-user";
import { useQuery } from "@tanstack/react-query";
import { AddEducationButton } from "./components/add-education-button";

export const ProfileEducationsPage = () => {
  const { data } = useQuery({
    queryKey: ["get-education-by-user"],
    queryFn: async () => await getEducationsByUser(),
  });

  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Seus Endereços Cadastrados" />

        <AddEducationButton />
      </div>

      <AddressesTable />
    </div>
    // <Table>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead>Graduação</TableHead>
    //       <TableHead>Instituição</TableHead>
    //       <TableHead>Curso</TableHead>
    //       <TableHead>Ano de Conclusão</TableHead>
    //       <TableHead>Ano de Iniciação</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {data &&
    //       data.addresses.content.map((address) => {
    //         return (
    //           <TableRow key={address.id}>
    //             <TableCell>
    //               {address.type === "HOUSE" ? (
    //                 <div className="flex w-fit items-center gap-4">
    //                   <HouseIcon className="size-6" />
    //                   <p className="text-base capitalize">
    //                     {ADDRESS_TYPE[address.type]}
    //                   </p>
    //                 </div>
    //               ) : (
    //                 <div className="flex w-fit items-center gap-4">
    //                   <Building className="size-6" />
    //                   <p className="text-base capitalize">
    //                     {ADDRESS_TYPE[address.type]}
    //                   </p>
    //                 </div>
    //               )}
    //             </TableCell>
    //             <TableCell className="text-base">
    //               {address.houseNumber}
    //             </TableCell>
    //             <TableCell className="text-base">
    //               {address.apartmentName ? (
    //                 <span className="text-base">{address.apartmentName}</span>
    //               ) : (
    //                 <span className="text-muted-foreground">-</span>
    //               )}
    //             </TableCell>
    //             <TableCell className="text-base">
    //               {address.apartmentNumber ? (
    //                 <span className="text-base">{address.apartmentNumber}</span>
    //               ) : (
    //                 <span className="text-muted-foreground">-</span>
    //               )}
    //             </TableCell>

    //             <TableCell className="text-base">
    //               Rua. {address.street}
    //             </TableCell>
    //             <TableCell className="text-base">
    //               {address.neighborhood}
    //             </TableCell>
    //             <TableCell className="text-base">{address.city}</TableCell>
    //             <TableCell className="text-base">
    //               {SHORT_DATE_ADDRESS[address.state]}
    //             </TableCell>
    //             <TableCell className="text-base">
    //               {address.postalCode}
    //             </TableCell>
    //             <TableCell>
    //               <div className="flex space-x-2">
    //                 <EditAddressButton address={address} />
    //                 <Button
    //                   variant="secondary"
    //                   size="icon"
    //                   className="group"
    //                   onClick={() => handleDeleteAddress(address.id)}
    //                 >
    //                   <Trash2 className="size-4 group-hover:text-red-600" />
    //                 </Button>
    //               </div>
    //             </TableCell>
    //           </TableRow>
    //         );
    //       })}
    //   </TableBody>
    // </Table>
  );
};
