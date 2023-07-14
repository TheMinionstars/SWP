package swp.server.hotelmanagement.services.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import swp.server.hotelmanagement.dtos.TransactionDTO;
import swp.server.hotelmanagement.entities.TransactionEntity;
import swp.server.hotelmanagement.mappers.MapperUtil;
import swp.server.hotelmanagement.repositories.BookingRepository;
import swp.server.hotelmanagement.repositories.PaymentRepository;
import swp.server.hotelmanagement.repositories.TransactionRepository;
import swp.server.hotelmanagement.services.TransactionService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private TransactionRepository transactionRepository;
    private PaymentRepository paymentRepository;
    private MapperUtil mapperUtil;
    private BookingRepository bookingRepository;

    @Override
    public List<TransactionDTO> getAllTransaction() {
        try {
            List<TransactionEntity> transactionEntities = transactionRepository.getAllTransactions();
            List<TransactionDTO> transactionDTOS = new ArrayList<>();
            transactionEntities.forEach(transactionEntity -> {
                TransactionDTO transactionDTO = mapperUtil.mapTransactionEntityToDTO(transactionEntity);
                transactionDTOS.add(transactionDTO);
            });
            return transactionDTOS;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public TransactionDTO getTransactionById(int transactionId) {
        try {
            return mapperUtil.mapTransactionEntityToDTO(transactionRepository.findById(transactionId).get());
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public TransactionDTO createNewTransaction(TransactionDTO transactionDTO) {
        try {
            TransactionEntity transactionEntity = new TransactionEntity();
            transactionEntity.setBookingEntity(bookingRepository.
                    getOne(transactionDTO.getBookingDTO().getBookingId()));
            transactionEntity.setPaymentEntity(mapperUtil.mapDtoToPaymentEntity(transactionDTO.getPaymentDTO()));
            transactionEntity.setDelete(false);
            transactionRepository.save(transactionEntity);
            return transactionDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public TransactionDTO updateTransaction(TransactionDTO transactionDTO) {
        try {
            TransactionEntity transactionEntity = new TransactionEntity();
            transactionEntity.setBookingEntity(bookingRepository.
                    getOne(transactionDTO.getBookingDTO().getBookingId()));
            transactionEntity.setPaymentEntity(mapperUtil.mapDtoToPaymentEntity(transactionDTO.getPaymentDTO()));

            return transactionDTO;
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }

    @Override
    public boolean deleteTransaction(int transactionId) {
        try {
            TransactionEntity transactionEntity = transactionRepository.getOne(transactionId);
            transactionEntity.setDelete(true);
            transactionRepository.save(transactionEntity);
            return true;
        } catch (Exception e) {
            e.getMessage();
        }
        return false;
    }
}
