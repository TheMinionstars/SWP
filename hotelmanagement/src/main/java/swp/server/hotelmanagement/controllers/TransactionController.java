package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.TransactionDTO;
import swp.server.hotelmanagement.services.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/hotel-server/api/v1")
@AllArgsConstructor
public class TransactionController {
    private TransactionService transactionService;

    @GetMapping("/transactions")
    public List<TransactionDTO> getAllTransaction() {
        return transactionService.getAllTransaction();
    }

    @GetMapping("/transaction/{id}")
    public TransactionDTO getTransactionById(@PathVariable(value = "id") int transactionId) {
        return transactionService.getTransactionById(transactionId);
    }

    @PostMapping("/transaction")
    public TransactionDTO createNewBlog(@RequestBody TransactionDTO transactionDTO) {
        return transactionService.createNewTransaction(transactionDTO);
    }

    @PutMapping("/updateTransaction")
    public TransactionDTO updateTransaction(@RequestBody TransactionDTO transactionDTO) {
        return transactionService.updateTransaction(transactionDTO);
    }

    @PutMapping("/deleteTransaction/{id}")
    public boolean deleteTransaction(@PathVariable(value = "id") int transactionId) {
        return transactionService.deleteTransaction(transactionId);
    }
}
