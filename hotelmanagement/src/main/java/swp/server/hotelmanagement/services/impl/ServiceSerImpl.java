package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.ServiceDTO;
import swp.server.hotelmanagement.entities.ServiceEntity;
import swp.server.hotelmanagement.repositories.ServiceRepository;
import swp.server.hotelmanagement.services.ServiceSer;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class ServiceSerImpl implements ServiceSer {
    private final ServiceRepository serviceRepository;

    @Override
    public List<ServiceDTO> getAllService() {
        try {
            List<ServiceEntity> serviceEntities = serviceRepository.findAll();
            List<ServiceDTO> serviceDTOS = new ArrayList<>();
            serviceEntities.stream().forEach(serviceEntity -> {
                ServiceDTO serviceDTO = new ServiceDTO(serviceEntity.getId(), serviceEntity.getName(),
                        serviceEntity.getDescription(), serviceEntity.getPrice());
                serviceDTOS.add(serviceDTO);
            });
            return serviceDTOS;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public ServiceDTO getServiceById(int serviceId) {
        try {
            ServiceEntity serviceEntity = serviceRepository.getOne(serviceId);
            return new ServiceDTO(serviceEntity.getId(), serviceEntity.getName(),
                    serviceEntity.getDescription(), serviceEntity.getPrice());
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public ServiceDTO createNewService(ServiceDTO serviceDTO) {
        try {
            ServiceEntity serviceEntity = new ServiceEntity();
            serviceEntity.setId(serviceDTO.getServiceId());
            serviceEntity.setName(serviceDTO.getName());
            serviceEntity.setDescription(serviceDTO.getDescription());
            serviceEntity.setPrice(serviceDTO.getPrice());
            serviceRepository.save(serviceEntity);
            return serviceDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public ServiceDTO updateService(ServiceDTO serviceDTO) {
        try {
            ServiceEntity serviceEntity = serviceRepository.getOne(serviceDTO.getServiceId());
            serviceEntity.setName(serviceDTO.getName());
            serviceEntity.setDescription(serviceDTO.getDescription());
            serviceEntity.setPrice(serviceDTO.getPrice());
            serviceRepository.save(serviceEntity);
            return serviceDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public Boolean deleteService(int serviceId) {
        try {
            if (serviceRepository.getOne(serviceId) != null) {
                serviceRepository.deleteById(serviceId);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.getMessage();
            return false;
        }
    }
}
