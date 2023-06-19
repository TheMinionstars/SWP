package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.AddressDTO;

import java.util.List;

public interface AddressService {
    List<AddressDTO> getAllAddress();
    AddressDTO getAddressById(int addressId);
    AddressDTO createNewAddress(AddressDTO addressDTO);
    AddressDTO updateAddress(AddressDTO addressDTO);
    Boolean deleteAddress(int addressId);
}
