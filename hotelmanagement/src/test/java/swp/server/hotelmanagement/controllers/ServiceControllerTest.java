package swp.server.hotelmanagement.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import swp.server.hotelmanagement.dtos.ServiceDTO;
import swp.server.hotelmanagement.services.ServiceSer;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
public class ServiceControllerTest {
    @InjectMocks
    ServiceController serviceController;
    @Mock
    ServiceSer serviceSer;

    @Test
    public void getAllServiceTest(){
        ServiceDTO serviceDTO = new ServiceDTO(1,"Ăn Uống","buffett",2000);
        ServiceDTO serviceDTO1 = new ServiceDTO(2,"Giặt là","mang đồ đi giặt",4000);
        List<ServiceDTO> serviceDTOList = new ArrayList<>();
        serviceDTOList.add(serviceDTO);
        serviceDTOList.add(serviceDTO1);
        when(serviceSer.getAllService()).thenReturn(serviceDTOList);
        assertThat(serviceController.getAllService()).isEqualTo(serviceDTOList);
        assertThat(serviceController.getAllService().get(0)).isEqualTo(serviceDTO);
    }
    @Test
    public void getByIdTest(){
        ServiceDTO serviceDTO = new ServiceDTO(1,"Ăn Uống","buffett",2000);
        when(serviceSer.getServiceById(1)).thenReturn(serviceDTO);
        assertThat(serviceController.getServiceById(1).getPrice()).isEqualTo(2000);
        assertThat(serviceController.getServiceById(1).getName()).isEqualTo(serviceDTO.getName());
    }
    @Test
    public void createNewServiceTest(){
        ServiceDTO serviceDTO = new ServiceDTO(1,"Ăn Uống","buffett",2000);
        when(serviceSer.createNewService(serviceDTO)).thenReturn(serviceDTO);
        assertThat(serviceController.createNewService(serviceDTO).getPrice()).isEqualTo(2000);
        assertThat(serviceController.createNewService(serviceDTO).getName()).isEqualTo(serviceDTO.getName());
    }
    @Test
    public void updateServiceTest(){
        ServiceDTO serviceDTO = new ServiceDTO(1,"Ăn Uống","buffett",2000);
        when(serviceSer.updateService(serviceDTO)).thenReturn(serviceDTO);
        assertThat(serviceController.updateService(serviceDTO).getPrice()).isEqualTo(2000);
        assertThat(serviceController.updateService(serviceDTO).getName()).isEqualTo(serviceDTO.getName());
    }

    @Test
    public void deleteServiceTest(){
        ServiceDTO serviceDTO = new ServiceDTO(1, "Ä‚n Uá»‘ng", "buffett", 2000);
        when(serviceSer.deleteService(serviceDTO.getServiceId())).thenReturn(true);
        assertThat(serviceController.deleteService(serviceDTO.getServiceId())).isTrue();
    }
}
