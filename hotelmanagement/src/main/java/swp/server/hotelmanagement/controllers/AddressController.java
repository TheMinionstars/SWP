package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.AddressDTO;
import swp.server.hotelmanagement.services.AddressService;

import java.util.List;

@RestController
@RequestMapping("hotel-server/api/v1")
@AllArgsConstructor
public class AddressController {
    private final AddressService addressService;
    @GetMapping("/address")
    public List<AddressDTO> getAllAddress() {
        return addressService.getAllAddress();
    }

    @GetMapping("/address/{id}")
    public AddressDTO getAddress(@PathVariable("id") int addressId) {
        return addressService.getAddressById(addressId);
    }

    @PostMapping("/address")
    public AddressDTO createNewAddress(@RequestBody AddressDTO addressDTO) {
        return addressService.createNewAddress(addressDTO);
    }

    @PutMapping("/updateAddress")
    public AddressDTO updateAddress(@RequestBody AddressDTO addressDTO) {
        return addressService.updateAddress(addressDTO);
    }

    @DeleteMapping("/deleteAddress/{id}")
    public boolean deleteAddress(@PathVariable("id") int addressId) {
        return addressService.deleteAddress(addressId);
    }



}
