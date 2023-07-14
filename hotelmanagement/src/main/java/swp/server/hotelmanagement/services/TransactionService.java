package swp.server.hotelmanagement.services;

import swp.server.hotelmanagement.dtos.TransactionDTO;

import java.util.List;

public interface TransactionService {
    List<TransactionDTO> getAllTransaction();

    TransactionDTO getTransactionById(int transactionId);

    TransactionDTO createNewTransaction(TransactionDTO transactionDTO);

    TransactionDTO updateTransaction(TransactionDTO transactionDTO);

    boolean deleteTransaction(int transactionId);

}
