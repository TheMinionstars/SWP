package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.AddressDTO;
import swp.server.hotelmanagement.entities.AddressEntity;
import swp.server.hotelmanagement.repositories.AddressRepository;
import swp.server.hotelmanagement.services.AddressService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    @Override
    public List<AddressDTO> getAllAddress() {
        List<AddressEntity> addressEntities = addressRepository.findAll();
        if (addressEntities != null) {
            List<AddressDTO> addressDTOS = new ArrayList<>();
            addressEntities.stream().forEach(address -> {
                AddressDTO addressDTO = new AddressDTO(address.getId(), address.getStreet(),
                        address.getCity(), address.getState(), address.getCountry(), address.getPostalCode());
                addressDTOS.add(addressDTO);
            });
            return addressDTOS;
        }
        return null;
    }

    @Override
    public AddressDTO getAddressById(int addressId) {
        AddressDTO addressDTO = new AddressDTO();
        try {
            AddressEntity addressEntity = addressRepository.getOne(addressId);
            addressDTO.setId(addressId);
            addressDTO.setStreet(addressEntity.getStreet());
            addressDTO.setCity(addressEntity.getCity());
            addressDTO.setCountry(addressEntity.getCountry());
            addressDTO.setCountry(addressEntity.getState());
            addressDTO.setPostalCode(addressEntity.getPostalCode());
            return addressDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public AddressDTO createNewAddress(AddressDTO addressDTO) {
        try {
            AddressEntity addressEntity = new AddressEntity();
            return getAddressDTO(addressDTO, addressEntity);
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public AddressDTO updateAddress(AddressDTO addressDTO) {
        try {
            AddressEntity oldAddressEntity = addressRepository.getOne(addressDTO.getId());
            return getAddressDTO(addressDTO, oldAddressEntity);
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    private AddressDTO getAddressDTO(AddressDTO addressDTO, AddressEntity oldAddressEntity) {
        oldAddressEntity.setCity(addressDTO.getCity());
        oldAddressEntity.setCountry(addressDTO.getCountry());
        oldAddressEntity.setStreet(addressDTO.getStreet());
        oldAddressEntity.setState(addressDTO.getState());
        oldAddressEntity.setPostalCode(addressDTO.getPostalCode());
        addressRepository.save(oldAddressEntity);
        return addressDTO;
    }

    @Override
    public Boolean deleteAddress(int addressId) {
        try {
            AddressEntity addressEntity = addressRepository.getOne(addressId);
            addressRepository.delete(addressEntity);
            return true;
        } catch (Exception e) {
            e.getMessage();
            return false;
        }
    }
}
