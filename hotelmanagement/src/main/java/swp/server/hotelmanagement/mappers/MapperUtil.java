package swp.server.hotelmanagement.mappers;

import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.*;
import swp.server.hotelmanagement.entities.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Use for mapper Entity with DTO
 */
@Service
public class MapperUtil {

    private RoomcategoryEntity roomcategoryEntity;

    /**
     * mapping AccountEntity to AccountDTO
     *
     * @param accountEntity
     * @return accountDTO
     */
    public AccountDTO mapToAccountDTO(AccountEntity accountEntity) {
        AccountDTO accountDTO = new AccountDTO(accountEntity.getId(), accountEntity.getProfileEntity().getFirstName(),
                accountEntity.getProfileEntity().getLastName(),
                accountEntity.getEmail(),
                accountEntity.getPassword(),
                accountEntity.getProfileEntity().getAvatar(),
                accountEntity.getProfileEntity().getSex(),
                accountEntity.getPhone(),
                accountEntity.getProfileEntity().getAddress(),
                accountEntity.getRoleEntity().getId());
        return accountDTO;
    }

    /**
     * mapping List RoomEntity to List RoomDTO
     *
     * @param roomEntities
     * @return roomDTOList
     */
    public List<RoomDTO> mapToListRoomDTO(List<RoomEntity> roomEntities) {
        List<RoomDTO> roomDTOS = new ArrayList<>();
        roomEntities.stream().forEach(roomEntity -> roomDTOS.add(mapRoomEntityToDTo(roomEntity)));

        return roomDTOS;
    }

    /**
     * mapping RoomEntity to RoomDTO
     *
     * @param roomEntity
     * @return roomDTO
     */
    public RoomDTO mapRoomEntityToDTo(RoomEntity roomEntity) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setRoomId(roomEntity.getId());
        roomDTO.setPrice(roomEntity.getPrice());
        roomDTO.setName(roomEntity.getName());
        roomDTO.setImage(roomEntity.getImage());
        roomDTO.setRent(roomEntity.isRent());
        roomDTO.setRoomCategoryDTO(mapCateToDTO(roomEntity.getRoomcategoryEntity()));
        return roomDTO;
    }

    /**
     * mapping RoomCategoryEntity to RoomCategoryDTO
     *
     * @param roomcategoryEntity
     * @return roomCategoryDTO
     */
    public RoomCategoryDTO mapCateToDTO(RoomcategoryEntity roomcategoryEntity) {
        RoomCategoryDTO roomCategoryDTO = new RoomCategoryDTO();
        roomCategoryDTO.setName(roomcategoryEntity.getName());
        roomCategoryDTO.setDescription(roomcategoryEntity.getDescription());
        roomCategoryDTO.setId(roomcategoryEntity.getId());
        roomCategoryDTO.setAmount(roomcategoryEntity.getAmount());
        return roomCategoryDTO;
    }

    /**
     * mapping List ServiceEntity to List ServiceDTO
     *
     * @param serviceEntities
     * @return serviceDTOs
     */
    public List<ServiceDTO> mapToListServiceDTO(List<ServiceEntity> serviceEntities) {
        List<ServiceDTO> serviceDTOS = new ArrayList<>();
        serviceEntities.stream().forEach(serviceEntity -> {
            ServiceDTO serviceDTO = new ServiceDTO(serviceEntity.getId(), serviceEntity.getName(),
                    serviceEntity.getDescription(), serviceEntity.getPrice());
            serviceDTOS.add(serviceDTO);
        });
        return serviceDTOS;
    }

    /**
     * mapping RoomDTO to RoomEntity
     *
     * @param roomDTO
     * @return RoomEntity
     */
    public RoomEntity mapRoomDTOToEntity(RoomDTO roomDTO) {
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setId(roomDTO.getRoomId());
        roomEntity.setPrice(roomDTO.getPrice());
        roomEntity.setName(roomDTO.getName());
        roomEntity.setImage(roomDTO.getImage());
        roomEntity.setRent(roomDTO.isRent());
        roomEntity.setRoomcategoryEntity(mapCateToEntity(roomDTO.getRoomCategoryDTO()));
        return roomEntity;
    }

    /**
     * mapping categoryDTO to CategoryEntity
     *
     * @param roomCategoryDTO
     * @return roomCategoryEntity
     */
    public RoomcategoryEntity mapCateToEntity(RoomCategoryDTO roomCategoryDTO) {
        RoomcategoryEntity roomcategoryEntity = new RoomcategoryEntity();
        roomcategoryEntity.setName(roomCategoryDTO.getName());
        roomcategoryEntity.setDescription(roomCategoryDTO.getDescription());
        roomcategoryEntity.setId(roomCategoryDTO.getId());
        roomcategoryEntity.setAmount(roomCategoryDTO.getAmount());
        return roomcategoryEntity;
    }

    /**
     * mapping List RoomDTO to List RoomEntity
     *
     * @param roomDTOS
     * @return RoomEntities
     */
    public List<RoomEntity> mapRoomDTOsToEntities(List<RoomDTO> roomDTOS) {
        List<RoomEntity> roomEntities = new ArrayList<>();
        roomDTOS.stream().forEach(roomDTO -> roomEntities.add(mapRoomDTOToEntity(roomDTO)));
        return roomEntities;
    }

    /**
     * mapping ServiceDTO to  ServiceEntity
     *
     * @param serviceDTO
     * @return ServiceEntity
     */
    public ServiceEntity mapDTOtoServiceEntity(ServiceDTO serviceDTO) {
        ServiceEntity serviceEntity = new ServiceEntity();
        serviceEntity.setId(serviceDTO.getServiceId());
        serviceEntity.setPrice(serviceDTO.getPrice());
        serviceEntity.setDescription(serviceDTO.getDescription());
        serviceEntity.setName(serviceDTO.getName());
        return serviceEntity;
    }

    /**
     * mapping List ServiceDTO to List ServiceEntity
     *
     * @param serviceDTOS
     * @return ServiceEntities
     */
    public List<ServiceEntity> mapToListServiceEntity(List<ServiceDTO> serviceDTOS) {
        List<ServiceEntity> serviceEntities = new ArrayList<>();
        serviceDTOS.stream().forEach(serviceDTO -> serviceEntities.add(mapDTOtoServiceEntity(serviceDTO)));
        return serviceEntities;
    }

    /**
     * @param bookingEntity
     * @return BookingDTO
     */
    public BookingDTO mapBookingEntityToDTO(BookingEntity bookingEntity) {
        BookingDTO bookingDTO = new BookingDTO(bookingEntity.getBookingId(),
                mapToAccountDTO(bookingEntity.getAccountEntity()),
                bookingEntity.getStatus(),
                bookingEntity.getCheckingDate().toString(),
                bookingEntity.getCheckOutDate().toString(),
                mapToListRoomDTO(bookingEntity.getBookingDetailEntities().stream().collect(Collectors.toList())),
                mapToListServiceDTO(bookingEntity.getBookingServiceDetailEntities().stream().collect(Collectors.toList())),
                bookingEntity.getTotalPrice());
        return bookingDTO;
    }


    /**
     * @param paymentEntity
     * @return PaymentDTO
     */
    public PaymentDTO mapPaymentEntityToDTO(PaymentEntity paymentEntity){
        PaymentDTO paymentDTO = new PaymentDTO(paymentEntity.getPaymentId(), paymentEntity.getMethod());
        return paymentDTO;
    }
    public PaymentEntity mapDtoToPaymentEntity(PaymentDTO paymentDTO){
        PaymentEntity paymentEntity = new PaymentEntity(paymentDTO.getPaymentId(),
                paymentDTO.getMethod());
        return paymentEntity;
    }

    /**
     * @param transactionEntity
     * @return TransactionDTO
     */
    public TransactionDTO mapTransactionEntityToDTO(TransactionEntity transactionEntity){
        TransactionDTO transactionDTO = new TransactionDTO(transactionEntity.getTransactionId(),
                mapBookingEntityToDTO(transactionEntity.getBookingEntity()),
                mapPaymentEntityToDTO(transactionEntity.getPaymentEntity()));
        return transactionDTO;
    }

}
