package swp.server.hotelmanagement.controllers.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.ServiceDTO;
import swp.server.hotelmanagement.services.ServiceSer;

import java.util.List;

@RestController
@RequestMapping("hotel-server/api/v1")
@AllArgsConstructor
public class ServiceController {
    private final ServiceSer serviceSer;

    @GetMapping("/services")
    public List<ServiceDTO> getAllService() {
        return serviceSer.getAllService();
    }

    @GetMapping("/service/{id}")
    public ServiceDTO getServiceById(@PathVariable(value = "id") int serviceId) {
        return serviceSer.getServiceById(serviceId);
    }

    @PostMapping("/service")
    public ServiceDTO createNewService(@RequestBody ServiceDTO serviceDTO) {
        return serviceSer.createNewService(serviceDTO);
    }

    @PutMapping("/updateService")
    public ServiceDTO updateService(ServiceDTO serviceDTO) {
        return serviceSer.updateService(serviceDTO);
    }

    @DeleteMapping("/deleteService/{id}")
    public boolean deleteService(@PathVariable(value = "id") int serviceId) {
        return serviceSer.deleteService(serviceId);
    }
}
