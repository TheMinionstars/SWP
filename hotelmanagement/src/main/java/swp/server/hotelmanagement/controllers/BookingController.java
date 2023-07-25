package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.BookingDTO;
import swp.server.hotelmanagement.services.BookingService;

import java.util.List;

@RestController
@RequestMapping("/hotel-server/api/v1")
@AllArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @GetMapping("/bookings")
    public List<BookingDTO> getAllBooking() {
        return bookingService.getAllBooking();
    }

    @GetMapping("/booking/{id}")
    public BookingDTO getBookingById(@PathVariable(value = "id") int bookingId) {
        return bookingService.getBookingById(bookingId);
    }
    @GetMapping("/bookingByAccount/{accountId}")
    public List<BookingDTO> bookingByAccount(@PathVariable(value = "accountId") int accountId) {
        return bookingService.getBookingByAccount(accountId);
    }

    @PostMapping("/booking")
    public BookingDTO createNewBlog(@RequestBody BookingDTO bookingDTO) {
        return bookingService.createNewBooking(bookingDTO);
    }

    @PutMapping("/updateBooking")
    public BookingDTO updateBooking(@RequestBody BookingDTO bookingDTO) {
        return bookingService.updateBooking(bookingDTO);
    }
    @PutMapping("/deleteBooking/{id}")
    public boolean deleteBooking(@PathVariable(value = "id") int bookingId) {
        return bookingService.deleteBooking(bookingId);
    }

}
