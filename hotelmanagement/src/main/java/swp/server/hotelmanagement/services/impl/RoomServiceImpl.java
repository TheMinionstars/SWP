package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.RoomCategoryDTO;
import swp.server.hotelmanagement.dtos.RoomDTO;
import swp.server.hotelmanagement.entities.RoomEntity;
import swp.server.hotelmanagement.entities.RoomcategoryEntity;
import swp.server.hotelmanagement.repositories.RoomRepository;
import swp.server.hotelmanagement.services.RoomService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public List<RoomDTO> getAllRooms() {
        try {
            List<RoomEntity> roomEntities = roomRepository.findAll();
            List<RoomDTO> roomDTOS = new ArrayList<>();
            roomEntities.stream().forEach(roomEntity -> {
                RoomDTO roomDTO = mapRoomEntityToDTo(roomEntity);
                roomDTOS.add(roomDTO);
            });

            return roomDTOS;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }

    }

    @Override
    public RoomDTO getRoomByRoomId(int roomId) {
        try {
            return mapRoomEntityToDTo(roomRepository.getOne(roomId));
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public RoomDTO updateRoom(RoomDTO roomDTO) {
        try {
            RoomEntity roomEntity = roomRepository.getOne(roomDTO.getRoomId());
            if (roomEntity != null) {
                roomEntity.setRoomcategoryEntity(mapCateToEntity(roomDTO.getRoomCategoryDTO()));
                roomEntity.setImage(roomDTO.getImage());
                roomEntity.setName(roomDTO.getName());
                roomEntity.setPrice(roomDTO.getPrice());
                roomEntity.setRent(roomDTO.isRent());
                roomRepository.save(roomEntity);
                return roomDTO;
            } else return null;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public RoomDTO createNewRoom(RoomDTO roomDTO) {
        try {
            roomRepository.save(mapRoomDTOToEntity(roomDTO));
            return roomDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public Boolean deleteRoom(int roomId) {
        try {
            roomRepository.delete(roomRepository.getOne(roomId));
            return true;
        } catch (Exception e) {
            e.getMessage();
        }
        return false;
    }

    private RoomCategoryDTO mapCateToDTO(RoomcategoryEntity roomcategoryEntity) {
        RoomCategoryDTO roomCategoryDTO = new RoomCategoryDTO();
        roomCategoryDTO.setName(roomcategoryEntity.getName());
        roomCategoryDTO.setDescription(roomcategoryEntity.getDescription());
        roomCategoryDTO.setId(roomcategoryEntity.getId());
        roomCategoryDTO.setAmount(roomcategoryEntity.getAmount());
        return roomCategoryDTO;
    }

    private RoomDTO mapRoomEntityToDTo(RoomEntity roomEntity) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setRoomId(roomEntity.getId());
        roomDTO.setPrice(roomEntity.getPrice());
        roomDTO.setName(roomEntity.getName());
        roomDTO.setImage(roomEntity.getImage());
        roomDTO.setRent(roomEntity.isRent());
        roomDTO.setRoomCategoryDTO(mapCateToDTO(roomEntity.getRoomcategoryEntity()));
        return roomDTO;
    }

    private RoomcategoryEntity mapCateToEntity(RoomCategoryDTO roomCategoryDTO) {
        RoomcategoryEntity roomcategoryEntity = new RoomcategoryEntity();
        roomcategoryEntity.setName(roomCategoryDTO.getName());
        roomcategoryEntity.setDescription(roomCategoryDTO.getDescription());
        roomcategoryEntity.setId(roomCategoryDTO.getId());
        roomcategoryEntity.setAmount(roomCategoryDTO.getAmount());
        return roomcategoryEntity;
    }

    private RoomEntity mapRoomDTOToEntity(RoomDTO roomDTO) {
        RoomEntity roomEntity = new RoomEntity();
        roomEntity.setPrice(roomDTO.getPrice());
        roomEntity.setName(roomDTO.getName());
        roomEntity.setImage(roomDTO.getImage());
        roomEntity.setRent(roomDTO.isRent());
        roomEntity.setRoomcategoryEntity(mapCateToEntity(roomDTO.getRoomCategoryDTO()));
        return roomEntity;
    }
}
